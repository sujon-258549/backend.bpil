import type { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../middleware/apiError.ts";
import prisma from "../../utils/prismaClient.js";
import slugCreate from "../../utils/slugCreate.ts";
import httpStatus from "http-status";
import { calculatePaginationOrSort } from "../../../shared/calculatePaginationOrSort.tsx";
import { folderSearchableFields } from "./folder.const.ts";
import config from "../../config/index.ts";
import axios from "axios";
import type { ActorContext } from "../../utils/tenant.ts";
import { tenantFilter, assertTenantAccess } from "../../utils/tenant.ts";
import FormData from "form-data";

const createFolder = async (payload: any, actor: ActorContext) => {
  const slugBase = payload.slug || slugCreate(payload.name);
  let slug = slugBase;
  let counter = 1;
  while (await prisma.folder.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${counter++}`;
  }
  let zoomParentId = null;
  if (payload.parentId) {
    const parentFolder = await prisma.folder.findUnique({
      where: { id: payload.parentId }
    });
    if (parentFolder?.zoomFolderId) {
      zoomParentId = parentFolder.zoomFolderId;
    }
  }

  let externalFolderId = null;
  try {
    const zoomResponse = await axios.post(`${config.zoomDigital.apiUrl}/folders`, {
      name: payload.name,
      parent_folder_id: zoomParentId
    }, {
      headers: {
        'x-api-key': config.zoomDigital.apiKey,
        'Content-Type': 'application/json'
      }
    });
    if (zoomResponse.data?.data?.id) {
      externalFolderId = zoomResponse.data.data.id;
    }
  } catch (error) {
    console.error("Failed to create folder on Zoom Digital API", error);
  }
  console.log({payload, slug, externalFolderId})

  const result = await prisma.folder.create({
    data: {
      ...payload,
      slug,
      zoomFolderId: externalFolderId,
    },
  });
  return result;
};

const buildFolderTree = (
  folders: any[],
  parentId: string | null = null,
): any[] => {
  return folders
    .filter((folder) => folder.parentId === parentId)
    .map((folder) => ({
      ...folder,
      children: buildFolderTree(folders, folder.id),
    }));
};

const getAllFolders = async (query: any, actor: ActorContext) => {
  const { searchTerm, page, limit, sortBy, sortOrder, ...filter } = query;

  const andCondition: Prisma.FolderWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: folderSearchableFields.map((text: string) => ({
        [text]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (filter.status !== undefined) {
    filter.status = filter.status === "true";
  }

  const rootParentId =
    filter.parentId === "root" ? null : filter.parentId || null;
  delete filter.parentId;

  const { limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy, sortOrder);

  const where: Prisma.FolderWhereInput = {
    AND: andCondition.length > 0 ? andCondition : undefined,
    ...filter,
      };

  const allFolders = await prisma.folder.findMany({
    where,
    include: {
      images: {
        select: { id: true, name: true, url: true, folderId: true },
      },
    },
    orderBy: { [sortByValue]: sortOrderValue },
  });

  const folderTree = buildFolderTree(allFolders, rootParentId);
  const paginatedFolders = folderTree;

  // Images in root parent — filter by tenant's folders
  const images = await prisma.image.findMany({
    where: {
      folderId: rootParentId,
      folder: tenantFilter(actor),
    },
    select: { url: true, name: true, id: true },
    orderBy: { createdAt: "asc" },
  });

  return {
    data: { folders: paginatedFolders, images },
  };
};

const getFolderById = async (id: string, actor: ActorContext) => {
  const result = await prisma.folder.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { images: true },
  });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Folder not found");


  const allFolders = await prisma.folder.findMany({
    where: tenantFilter(actor),
    include: { images: true },
    orderBy: { createdAt: "asc" },
  });

  return {
    ...result,
    children: buildFolderTree(allFolders, result.id),
  };
};

const updateFolder = async (id: string, payload: any, actor: ActorContext) => {
  const existing = await prisma.folder.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Folder not found");


  const updateData: Prisma.FolderUpdateInput = { ...payload };

  if (payload.name) {
    updateData.name = payload.name;
    const slugBase = payload.slug || slugCreate(payload.name);
    let slug = slugBase;
    let counter = 1;
    while (await prisma.folder.findFirst({ where: { slug, NOT: { id } } })) {
      slug = `${slugBase}-${counter++}`;
    }
    updateData.slug = slug;

    if (existing.zoomFolderId) {
      try {
        await axios.put(`${config.zoomDigital.apiUrl}/folders/${existing.zoomFolderId}`, {
          name: payload.name
        }, {
          headers: {
            'x-api-key': config.zoomDigital.apiKey,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error(`Failed to rename external folder on Zoom Digital (ID: ${existing.zoomFolderId})`, error);
      }
    }
  }

  const result = await prisma.folder.update({ where: { id }, data: updateData });
  return result;
};

const deleteFolder = async (id: string, actor: ActorContext) => {
  const existing = await prisma.folder.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Folder not found");

  if (existing.zoomFolderId) {
    try {
      await axios.delete(`${config.zoomDigital.apiUrl}/folders/${existing.zoomFolderId}`, {
        headers: {
          'x-api-key': config.zoomDigital.apiKey
        }
      });
    } catch (error) {
      console.error(`Failed to delete external folder on Zoom Digital (ID: ${existing.zoomFolderId})`, error);
    }
  }

  const result = await prisma.folder.delete({ where: { id } });
  return result;
};

const uploadFile = async (
  file: Express.Multer.File,
  folderId?: string,
  actor?: ActorContext
) => {
  let zoomFolderId = null;
  if (folderId && folderId !== "root") {
    const parentFolder = await prisma.folder.findUnique({
      where: { id: folderId }
    });
    if (parentFolder?.zoomFolderId) {
      zoomFolderId = parentFolder.zoomFolderId;
    }
  }

  const formData = new FormData();
  formData.append("file", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });
  
  if (zoomFolderId) {
    formData.append("folder_id", zoomFolderId.toString());
  }

  try {
    const zoomResponse = await axios.post(`${config.zoomDigital.apiUrl}/files`, formData, {
      headers: {
        'x-api-key': config.zoomDigital.apiKey,
        ...formData.getHeaders()
      }
    });

    if (zoomResponse.data?.data) {
      const zoomData = zoomResponse.data.data;
      const slugBase = slugCreate(zoomData.name);
      let slug = slugBase;
      let counter = 1;
      while (await prisma.image.findFirst({ where: { slug } })) {
        slug = `${slugBase}-${counter++}`;
      }

      let imageUrl = null;
      try {
        const linkResponse = await axios.post(`${config.zoomDigital.apiUrl}/files/${zoomData.id}/download-link`, {}, {
          headers: { 'x-api-key': config.zoomDigital.apiKey }
        });
        if (linkResponse.data?.data?.url) {
          imageUrl = linkResponse.data.data.url;
        }
      } catch (e) {
        console.error("Failed to fetch download link during upload", e);
      }

      const image = await prisma.image.create({
        data: {
          name: zoomData.name,
          url: imageUrl,
          slug,
          zoomFileId: zoomData.id,
          folderId: folderId === "root" ? null : (folderId || null),
        }
      });
      return image;
    }
  } catch (error: any) {
    console.error("Failed to upload file to Zoom Digital API", error?.response?.data || error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to upload file to external server");
  }
};

const getImageProxy = async (id: string) => {
  const image = await prisma.image.findUnique({ where: { id } });
  if (!image || !image.zoomFileId) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image not found");
  }

  try {
    // Get secure download link from Zoom Digital API
    const response = await axios.post(
      `${config.zoomDigital.apiUrl}/files/${image.zoomFileId}/download-link`,
      {},
      {
        headers: { 'x-api-key': config.zoomDigital.apiKey }
      }
    );
    
    if (response.data?.data?.url) {
      return { url: response.data.data.url };
    }
  } catch (error) {
    console.error("Failed to get signed URL from Zoom Digital API", error);
  }
  
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to generate image link");
};

const updateImage = async (id: string, payload: { name: string }, actor?: ActorContext) => {
  const image = await prisma.image.findUnique({ where: { id } });
  if (!image) throw new ApiError(httpStatus.NOT_FOUND, "Image not found");

  const slugBase = payload.name ? slugCreate(payload.name) : image.slug;
  let slug = slugBase;
  
  if (payload.name && payload.name !== image.name) {
    let counter = 1;
    while (await prisma.image.findFirst({ where: { slug, NOT: { id } } })) {
      slug = `${slugBase}-${counter++}`;
    }

    if (image.zoomFileId) {
      try {
        await axios.put(`${config.zoomDigital.apiUrl}/files/${image.zoomFileId}`, {
          name: payload.name
        }, {
          headers: {
            'x-api-key': config.zoomDigital.apiKey,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error(`Failed to rename external file on Zoom Digital (ID: ${image.zoomFileId})`, error);
      }
    }
  }

  const result = await prisma.image.update({
    where: { id },
    data: {
      name: payload.name,
      slug,
    },
  });
  return result;
};

const deleteImage = async (id: string, actor?: ActorContext) => {
  const image = await prisma.image.findUnique({ where: { id } });
  if (!image) throw new ApiError(httpStatus.NOT_FOUND, "Image not found");

  if (image.zoomFileId) {
    try {
      await axios.delete(`${config.zoomDigital.apiUrl}/files/${image.zoomFileId}`, {
        headers: {
          'x-api-key': config.zoomDigital.apiKey
        }
      });
    } catch (error) {
      console.error(`Failed to delete external file on Zoom Digital (ID: ${image.zoomFileId})`, error);
    }
  }

  const result = await prisma.image.delete({ where: { id } });
  return result;
};

export const FolderServices = {
  createFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
  deleteFolder,
  uploadFile,
  getImageProxy,
  updateImage,
  deleteImage,
};

