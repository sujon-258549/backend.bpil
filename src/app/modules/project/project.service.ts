import { Prisma } from "../../../generated/prisma/index.js";
import prisma from "../../utils/prismaClient.ts";
import ApiError from "../../middleware/apiError.ts";
import httpStatus from "http-status";
import type { IProjectFilterRequest } from "./project.interface.ts";

const createProject = async (payload: any) => {
  if (payload.name) {
    payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  if (payload.gallery && Array.isArray(payload.gallery)) {
    payload.gallery = {
      connect: payload.gallery.map((id: string) => ({ id })),
    };
  }
  const result = await prisma.project.create({
    data: payload,
  });
  return result;
};

const getAllProjects = async (filters: IProjectFilterRequest, paginationOptions: any) => {
  const { searchTerm, isActive, category, status } = filters;
  const { page = 1, limit = 10, skip = 0 } = paginationOptions;

  const andConditions: Prisma.ProjectWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: ["name", "category"].map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (isActive !== undefined) {
    andConditions.push({ isActive: isActive === "true" || isActive === true });
  }

  if (category) {
    andConditions.push({ category });
  }

  if (status) {
    andConditions.push({ status });
  }

  const whereConditions: Prisma.ProjectWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.project.findMany({
    where: whereConditions,
    skip: Number(skip),
    take: Number(limit),
    orderBy: paginationOptions.sortBy ? { [paginationOptions.sortBy]: paginationOptions.sortOrder || "desc" } : { createdAt: "desc" },
    include: {
      thumbnail: true,
      gallery: true,
      product: true
    }
  });

  const total = await prisma.project.count({ where: whereConditions });

  return {
    meta: { page: Number(page), limit: Number(limit), total },
    data: result,
  };
};

const getSingleProject = async (id: string) => {
  const result = await prisma.project.findUnique({
    where: { id },
    include: { 
      thumbnail: true,
      gallery: true,
      product: true
    }
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found!");
  }
  return result;
};

const updateProject = async (id: string, payload: any) => {
  if (payload.name) {
    payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  if (payload.gallery && Array.isArray(payload.gallery)) {
    payload.gallery = {
      set: payload.gallery.map((id: string) => ({ id })),
    };
  }
  const result = await prisma.project.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteProject = async (id: string) => {
  const result = await prisma.project.delete({
    where: { id },
  });
  return result;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
