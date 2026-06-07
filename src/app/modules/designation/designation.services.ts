import type { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../middleware/apiError.ts";
import httpStatus from "http-status";
import { calculatePaginationOrSort } from "../../../shared/calculatePaginationOrSort.tsx";
import { designationSearchableFields } from "./designation.const.ts";
import prisma from "../../utils/prismaClient.ts";
import slugCreate from "../../utils/slugCreate.ts";
import {
  assertTenantAccess,
  isPlatformAdmin,
  type ActorContext,
} from "../../utils/tenant.ts";
import { logAction } from "../../utils/logger.service.ts";

// Designations are now per-tenant. Branch Super Admins create + see their
// own list; other tenants can't see them. Platform admins can also create
// global designations (branchId = null) as templates.

const createDesignation = async (payload: any, actor?: ActorContext) => {
  // Force-scope to caller's branch for non-platform users.
  const branchId =
    actor && !isPlatformAdmin(actor.role)
      ? null : null;

  const slug = payload.slug || slugCreate(payload.name);

  const exists = await prisma.designation.findFirst({
    where: {
      
      OR: [{ name: payload.name }, { slug }],
    },
  });
  if (exists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Designation already exists");
  }

  const result = await prisma.designation.create({
    data: {
      name: payload.name,
      slug,
      description: payload.description,
      isActive: payload.isActive ?? true,
      
    },
  });

  await logAction(actor?.userId, "CREATE", "DESIGNATION", result.id, null, result);

  return result;
};

const getAllDesignations = async (query: any, actor?: ActorContext) => {
  const { page, limit, searchTerm, sortBy, sortOrder, startDate, endDate, ...filter } = query;

  const andCondition: Prisma.DesignationWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: designationSearchableFields.map((field: string) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (filter.isActive !== undefined) {
    filter.isActive = filter.isActive === "true" || filter.isActive === true;
  }

  if (Object.keys(filter).length > 0) {
    andCondition.push({
      AND: Object.keys(filter).map((key) => ({
        [key]: { equals: filter[key as keyof typeof filter] },
      })),
    });
  }

  // Tenant scoping — non-platform users see only their branch's
  // designations.
  if (actor && !isPlatformAdmin(actor.role)) {
    
  }

  const { pageNumber, limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy, sortOrder);

  if (startDate || endDate) {
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate as string);
    if (endDate) dateFilter.lte = new Date(endDate as string);
    andCondition.push({ createdAt: dateFilter } as any);
  }


  const where: Prisma.DesignationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const data = await prisma.designation.findMany({
    where,
    take: limitNumber,
    skip,
    orderBy: { [sortByValue]: sortOrderValue },
  });

  const total = await prisma.designation.count({ where });

  return {
    data,
    meta: { page: pageNumber, limit: limitNumber, total },
  };
};

const getDesignationById = async (id: string, actor?: ActorContext) => {
  const result = await prisma.designation.findUnique({ where: { id } });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Designation not found");

  return result;
};

const updateDesignation = async (
  id: string,
  payload: any,
  actor?: ActorContext,
) => {
  const existing = await prisma.designation.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Designation not found");
  if (actor) {

    if (
      !isPlatformAdmin(actor.role) &&
      payload.branchId &&
      payload.branchId !== null
    ) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Cannot move a designation to another branch",
      );
    }
  }

  const data: any = {};
  if (payload.name !== undefined) {
    data.name = payload.name;
    data.slug = slugCreate(payload.name);
  }
  if (payload.description !== undefined) data.description = payload.description;
  if (payload.isActive !== undefined) data.isActive = payload.isActive;

  const result = await prisma.designation.update({ where: { id }, data });

  await logAction(actor?.userId, "UPDATE", "DESIGNATION", id, existing, result);

  return result;
};

const deleteDesignation = async (id: string, actor?: ActorContext) => {
  const existing = await prisma.designation.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Designation not found");


  await logAction(actor?.userId, "DELETE", "DESIGNATION", id, existing, null);

  await prisma.designation.delete({ where: { id } });
  return { message: "Designation deleted successfully" };
};

const updateDesignationStatus = async (id: string, actor?: ActorContext) => {
  const existing = await prisma.designation.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Designation not found");


  const result = await prisma.designation.update({
    where: { id },
    data: { isActive: !existing.isActive },
  });

  await logAction(actor?.userId, "UPDATE", "DESIGNATION", id, existing, result);

  return result;
};

export const DesignationServices = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
  updateDesignationStatus,
};
