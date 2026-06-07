import httpStatus from "http-status";
import prisma from "../../utils/prismaClient.ts";
import ApiError from "../../middleware/apiError.ts";
import slugCreate from "../../utils/slugCreate.ts";
import type { Prisma } from "../../../generated/prisma/client.js";
import { calculatePaginationOrSort } from "../../../shared/calculatePaginationOrSort.tsx";
import { blogSearchableFields } from "./blog.constant.ts";
import type { ActorContext } from "../../utils/tenant.ts";
import { tenantFilter, assertTenantAccess } from "../../utils/tenant.ts";
import { logAction } from "../../utils/logger.service.ts";

const createBlog = async (payload: any, user: any) => {
  const slugBase = payload.slug || slugCreate(payload.title);

  console.log("user", user);
  
  let slug = slugBase;
  let counter = 1;
  while (await prisma.blog.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${counter++}`;
  }
  // Never let the client override the author — always use the authenticated user
  delete payload.authorId;

  const data: any = {
    ...payload,
    slug,
    authorId: user.id,
  };
  if (payload.createdAt) data.createdAt = new Date(payload.createdAt);
  if (payload.updatedAt) data.updatedAt = new Date(payload.updatedAt);

  const result = await prisma.blog.create({ data });

  await logAction(user.id, "CREATE", "BLOG", result.id, null, result);

  return result;
};

const getAllBlog = async (query: any, user: any) => {
  const { searchTerm, page, limit, sortBy, sortOrder, startDate, endDate, ...queryFilter } = query;

  const andCondition: Prisma.BlogWhereInput[] = [];
  const { pageNumber, limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy, sortOrder);

  if (startDate || endDate) {
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate as string);
    if (endDate) dateFilter.lte = new Date(endDate as string);
    andCondition.push({ createdAt: dateFilter } as any);
  }


  if (searchTerm) {
    andCondition.push({
      OR: blogSearchableFields.map((text: string) => ({
        [text]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (queryFilter.isPublished !== undefined) {
    queryFilter.isPublished = queryFilter.isPublished === "true";
  }

  if (queryFilter.category) {
    const categories = typeof queryFilter.category === "string" 
      ? [queryFilter.category] 
      : queryFilter.category;
    queryFilter.category = { hasSome: categories };
  }

  const where: Prisma.BlogWhereInput = {
    AND: andCondition.length > 0 ? andCondition : undefined,
    ...queryFilter,
      };

  const take = limit !== undefined ? Number(limit) : undefined;
  const skipCalc = limit !== undefined ? (Number(page || 1) - 1) * Number(limit) : undefined;

  const result = await prisma.blog.findMany({
    where,
    ...(take !== undefined && { take }),
    ...(skipCalc !== undefined && { skip: skipCalc }),
    orderBy: { [sortByValue]: sortOrderValue },
    include: {
      thumbnail: true,
      coverImage: true,
      author: {
        select: {
          id: true,
          email: true,
          mobile: true,
          profile: {
            select: {
              name: true,
              photo: true,
              profilePhoto: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.blog.count({ where });

  return {
    data: result,
    meta: { page: pageNumber, limit: take !== undefined ? take : total, total },
  };
};

const getBlogById = async (id: string, user: any) => {
  const result = await prisma.blog.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: {
      thumbnail: true,
      coverImage: true,
      author: {
        select: {
          id: true,
          email: true,
          mobile: true,
          profile: {
            select: {
              name: true,
              photo: true,
              profilePhoto: true,
            },
          },
        },
      },
    },
  });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");

  return result;
};

const updateBlog = async (id: string, payload: any, user: any) => {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
console.log("user", user);

  const updateData: Partial<Prisma.BlogUpdateInput> = { ...payload };

  // Never allow client to change authorId — strip it from payload
  delete (updateData as any).authorId;

  // If blog has no author yet (old records), backfill with current user
  if (!existing.authorId && user.id) {
    (updateData as any).authorId = user.id;
  }

  if (payload.title) {
    updateData.title = payload.title;
    const slugBase = payload.slug || slugCreate(payload.title);
    let slug = slugBase;
    let counter = 1;
    while (await prisma.blog.findFirst({ where: { slug, NOT: { id } } })) {
      slug = `${slugBase}-${counter++}`;
    }
    updateData.slug = slug;
  } else if (payload.slug) {
    updateData.slug = payload.slug;
  }

  if (payload.createdAt) updateData.createdAt = new Date(payload.createdAt);
  if (payload.updatedAt) updateData.updatedAt = new Date(payload.updatedAt);

  const result = await prisma.blog.update({ where: { id }, data: updateData });

  // Log who updated and what changed (previous vs new), tracking the actorId (author/updater)
  await logAction(user.id, "UPDATE", "BLOG", id, existing, result);

  return result;
};

const updateBlogStatus = async (id: string, user: any) => {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");


  const result = await prisma.blog.update({
    where: { id },
    data: { isPublished: !existing.isPublished, publishedAt: new Date() },
  });

  await logAction(user.id, "UPDATE", "BLOG", id, existing, result);

  return result;
};

const deleteBlog = async (id: string, user: any) => {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");


  await logAction(user.id, "DELETE", "BLOG", id, existing, null);

  await prisma.blog.delete({ where: { id } });
  return { message: "Blog deleted successfully" };
};

export const BlogServices = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  updateBlogStatus,
};

