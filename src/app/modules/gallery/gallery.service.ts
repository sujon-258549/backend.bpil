import type { Prisma } from "../../../generated/prisma/client.js";
import httpStatus from "http-status";
import ApiError from "../../middleware/apiError.ts";
import prisma from "../../utils/prismaClient.ts";
import { calculatePaginationOrSort } from "../../../shared/calculatePaginationOrSort.tsx";
import { gallerySearchableFields } from "./gallery.constant.ts";
import type { ActorContext } from "../../utils/tenant.ts";
import { tenantFilter, assertTenantAccess } from "../../utils/tenant.ts";

const createGalleryIntoDB = async (payload: any, actor: ActorContext) => {
  const result = await prisma.gallery.create({
    data: {
      ...payload,
      
    },
  });
  return result;
};

const getAllGallery = async (query: any, actor: ActorContext) => {
  const { page, limit, searchTerm, sortBy, sortOrder, ...filter } = query;

  const andCondition: Prisma.GalleryWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: gallerySearchableFields.map((text: string) => ({
        [text]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  const { pageNumber, limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy, sortOrder);

  const where: Prisma.GalleryWhereInput = {
    AND: andCondition.length > 0 ? andCondition : undefined,
    ...filter,
      };

  const result = await prisma.gallery.findMany({
    where,
    take: limitNumber,
    skip,
    orderBy: { [sortByValue]: sortOrderValue },
    include: { image: true },
  });

  const total = await prisma.gallery.count({ where });

  return {
    data: result,
    meta: { page: pageNumber, limit: limitNumber, total },
  };
};

const getGalleryById = async (id: string, actor: ActorContext) => {
  const result = await prisma.gallery.findUnique({
    where: { id },
    include: { image: true },
  });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Gallery not found");

  return result;
};

const updateGallery = async (
  id: string,
  payload: any,
  actor: ActorContext,
) => {
  const existing = await prisma.gallery.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Gallery not found");


  const result = await prisma.gallery.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteGallery = async (id: string, actor: ActorContext) => {
  const existing = await prisma.gallery.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Gallery not found");


  const result = await prisma.gallery.delete({ where: { id } });
  return result;
};

const updateGalleryStatus = async (id: string, actor: ActorContext) => {
  const existing = await prisma.gallery.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Gallery not found");


  const result = await prisma.gallery.update({
    where: { id },
    data: { isActive: !existing.isActive },
  });
  return result;
};

export const GalleryServices = {
  createGalleryIntoDB,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
  updateGalleryStatus,
};
