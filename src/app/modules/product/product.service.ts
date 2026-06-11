import { Prisma } from "../../../generated/prisma/index.js";
import prisma from "../../utils/prismaClient.ts";
import ApiError from "../../middleware/apiError.ts";
import httpStatus from "http-status";
import type { IProductFilterRequest } from "./product.interface.ts";

const createProduct = async (payload: any) => {
  if (payload.name) {
    payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  if (payload.gallery && Array.isArray(payload.gallery)) {
    payload.gallery = {
      connect: payload.gallery.map((id: string) => ({ id })),
    };
  }
  const result = await prisma.product.create({
    data: payload,
  });
  return result;
};

const getAllProducts = async (filters: IProductFilterRequest, paginationOptions: any) => {
  const { searchTerm, isActive, category } = filters;
  const { page = 1, limit = 10, skip = 0 } = paginationOptions;

  const andConditions: Prisma.ProductWhereInput[] = [];

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

  const whereConditions: Prisma.ProductWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip: Number(skip),
    take: Number(limit),
    orderBy: paginationOptions.sortBy ? { [paginationOptions.sortBy]: paginationOptions.sortOrder || "desc" } : { createdAt: "desc" },
    include: {
      thumbnail: true,
      gallery: true
    }
  });

  const total = await prisma.product.count({ where: whereConditions });

  return {
    meta: { page: Number(page), limit: Number(limit), total },
    data: result,
  };
};

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { id },
    include: { 
      thumbnail: true,
      gallery: true
    }
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return result;
};

const updateProduct = async (id: string, payload: any) => {
  if (payload.name) {
    payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  if (payload.gallery && Array.isArray(payload.gallery)) {
    payload.gallery = {
      set: payload.gallery.map((id: string) => ({ id })),
    };
  }
  const result = await prisma.product.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await prisma.product.delete({
    where: { id },
  });
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
