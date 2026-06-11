import prisma from "../../utils/prismaClient.ts";

/**
 * Single Upsert: Create or update dynamic content by key
 */
const upsertDynamicContent = async (payload: any, userId?: string) => {
  const { key, ...data } = payload;

  if (userId) {
    data.updatedById = userId;
  }

  // Smart logic: If type is 'image' and value is a string, treat value as imageId
  if (data.type === "image" && typeof data.value === "string") {
    data.imageId = data.value;
  }

  // Get existing one for history
  const existing = await prisma.dynamicContent.findUnique({ where: { key } });

  const result = await prisma.dynamicContent.upsert({
    where: { key },
    update: data,
    create: { key, ...data },
    include: { image: true },
  });

  // Create history record
  await prisma.dynamicContentHistory.create({
    data: {
      dynamicContentId: result.id,
      oldValue: (existing?.value as any),
      newValue: (result.value as any),
      updatedById: userId ?? null,
    },
  });

  return {
    ...result,
    image: result.image?.url || null,
    url: result.image?.url || null,
  };
};

/**
 * Bulk Upsert: Create or update multiple contents at once
 */
const bulkUpsertDynamicContents = async (contents: any[], userId?: string) => {
  const results = await Promise.all(
    contents.map(async (content) => {
      const { key, ...data } = content;

      if (userId) {
        data.updatedById = userId;
      }
      
      // Smart logic for image handling
      if (data.type === "image" && typeof data.value === "string") {
        data.imageId = data.value;
      }

      // Get existing one for history
      const existing = await prisma.dynamicContent.findUnique({ where: { key } });

      const result = await prisma.dynamicContent.upsert({
        where: { key },
        update: data,
        create: { key, ...data },
        include: { image: true },
      });

      // Create history record
      await prisma.dynamicContentHistory.create({
        data: {
          dynamicContentId: result.id,
          oldValue: (existing?.value as any),
          newValue: (result.value as any),
          updatedById: userId ?? null,
        },
      });

      return {
        ...result,
        image: result.image?.url || null,
        url: result.image?.url || null,
      };
    })
  );
  return results;
};

/**
 * Get all contents grouped by their category
 */
const getDynamicContentsByGroup = async (group: string) => {
  const contents = await prisma.dynamicContent.findMany({
    where: { group, isActive: true },
    include: { image: true },
  });

  return contents.map((curr: any) => ({
    ...curr,
    image: curr.image?.url || null,
    url: curr.image?.url || null,
  }));
};

/**
 * Get all contents as a key-value object for easy frontend usage
 */
const getDynamicContentsMap = async (group?: string) => {
  const where: any = { isActive: true };
  if (group) where.group = group;

  const contents = await prisma.dynamicContent.findMany({ 
    where,
    include: { image: true }
  });
  
  return contents.reduce((acc: any, curr: any) => {
    acc[curr.key] = {
      ...curr,
      image: curr.image?.url || null,
      url: curr.image?.url || null,
      imageId: curr.imageId,
    };
    return acc;
  }, {});
};

/**
 * Delete single content
 */
const deleteDynamicContent = async (key: string) => {
  return await prisma.dynamicContent.delete({
    where: { key },
  });
};

/**
 * Bulk Delete contents by keys
 */
const bulkDeleteDynamicContents = async (keys: string[]) => {
  return await prisma.dynamicContent.deleteMany({
    where: {
      key: { in: keys },
    },
  });
};

/**
 * Get all contents with pagination
 */
const getAllDynamicContents = async (query: any) => {
  const { group, type, isActive, searchTerm } = query;
  
  const where: any = {};
  if (group) where.group = group;
  if (type) where.type = type;
  if (isActive !== undefined) where.isActive = isActive === 'true';
  
  if (searchTerm) {
    where.OR = [
      { key: { contains: searchTerm, mode: 'insensitive' } },
      { name: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  const contents = await prisma.dynamicContent.findMany({
    where,
    include: { 
      image: true, 
      updatedBy: {
        select: {
          id: true,
          email: true,
          profile: true,
        }
      },
      histories: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          updatedBy: {
            select: {
              id: true,
              email: true,
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  return contents.map((curr: any) => ({
    ...curr,
    image: curr.image?.url || null,
    url: curr.image?.url || null,
  }));
};

export const DynamicContentService = {
  upsertDynamicContent,
  bulkUpsertDynamicContents,
  getDynamicContentsByGroup,
  getDynamicContentsMap,
  deleteDynamicContent,
  bulkDeleteDynamicContents,
  getAllDynamicContents,
};
