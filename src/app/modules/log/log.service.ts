import prisma from "../../utils/prismaClient.ts";
import { calculatePaginationOrSort } from "../../../shared/calculatePaginationOrSort.tsx";

const getActionLogs = async (query: any) => {
  const { page, limit, sortBy, sortOrder, module, actorId, startDate, endDate } = query;
  const { pageNumber, limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy || "createdAt", sortOrder || "desc");

  const where: any = {};
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate as string);
    if (endDate) where.createdAt.lte = new Date(endDate as string);
  }

  if (module) {
    where.module = module;
  }
  if (actorId) {
    where.actorId = actorId;
  }

  const logs = await prisma.actionLog.findMany({
    where,
    skip,
    take: limitNumber,
    orderBy: { [sortByValue]: sortOrderValue },
    include: {
      actor: {
        select: {
          id: true,
          email: true,
          profile: { select: { name: true } },
        },
      },
    },
  });

  const total = await prisma.actionLog.count({ where });

  return {
    data: logs,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
  };
};

const getErrorLogs = async (query: any) => {
  const { page, limit, sortBy, sortOrder } = query;
  const { pageNumber, limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy || "createdAt", sortOrder || "desc");

  const logs = await prisma.errorLog.findMany({
    skip,
    take: limitNumber,
    orderBy: { [sortByValue]: sortOrderValue },
  });

  const total = await prisma.errorLog.count();

  return {
    data: logs,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
  };
};

export const LogServices = {
  getActionLogs,
  getErrorLogs,
};
