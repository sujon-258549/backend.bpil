import type { Prisma } from "../../../generated/prisma/client.js";
import httpStatus from "http-status";
import ApiError from "../../middleware/apiError.ts";
import prisma from "../../utils/prismaClient.ts";
import { calculatePaginationOrSort } from "../../../shared/calculatePaginationOrSort.tsx";
import { videoSearchableFields } from "./video.constant.ts";
import type { ActorContext } from "../../utils/tenant.ts";
import { tenantFilter, assertTenantAccess } from "../../utils/tenant.ts";

const createVideoIntoDB = async (payload: any, actor: ActorContext) => {
  const result = await prisma.video.create({
    data: {
      ...payload,
      
    },
  });
  return result;
};

const getAllVideo = async (query: any, actor: ActorContext) => {
  const { page, limit, searchTerm, sortBy, sortOrder, ...filter } = query;

  const andCondition: Prisma.VideoWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: videoSearchableFields.map((text: string) => ({
        [text]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  const { pageNumber, limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy, sortOrder);

  const where: Prisma.VideoWhereInput = {
    AND: andCondition.length > 0 ? andCondition : undefined,
    ...filter,
      };

  const result = await prisma.video.findMany({
    where,
    take: limitNumber,
    skip,
    orderBy: { [sortByValue]: sortOrderValue },
    include: { poster: true },
  });

  const total = await prisma.video.count({ where });

  return {
    data: result,
    meta: { page: pageNumber, limit: limitNumber, total },
  };
};

const getVideoById = async (id: string, actor: ActorContext) => {
  const result = await prisma.video.findUnique({ 
    where: { id },
    include: { poster: true },
  });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Video not found");

  return result;
};

const updateVideo = async (
  id: string,
  payload: any,
  actor: ActorContext,
) => {
  const existing = await prisma.video.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Video not found");


  const result = await prisma.video.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteVideo = async (id: string, actor: ActorContext) => {
  const existing = await prisma.video.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Video not found");


  const result = await prisma.video.delete({ where: { id } });
  return result;
};

const updateVideoStatus = async (id: string, actor: ActorContext) => {
  const existing = await prisma.video.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Video not found");


  const result = await prisma.video.update({
    where: { id },
    data: { isActive: !existing.isActive },
  });
  return result;
};

export const VideoServices = {
  createVideoIntoDB,
  getAllVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  updateVideoStatus,
};
