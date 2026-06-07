import prisma from "../../utils/prismaClient.ts";
import type { Prisma } from "../../../generated/prisma/client.js";
import { calculatePaginationOrSort } from "../../../shared/calculatePaginationOrSort.tsx";
import { notificationSearchableFields } from "./notification.constant.ts";
import httpStatus from "http-status";
import ApiError from "../../middleware/apiError.ts";
import { getIO } from "../../utils/socket.js";
import type { ActorContext } from "../../utils/tenant.ts";
import { tenantFilter, assertTenantAccess } from "../../utils/tenant.ts";

const createNotification = async (payload: any, actor: ActorContext) => {
  if (payload.userIds && Array.isArray(payload.userIds)) {
    // Broadcast to multiple users
    const notifications = payload.userIds.map((id: string) => ({
      userId: id,
      type: payload.type || "SYSTEM",
      message: payload.message,
    }));
    await prisma.notification.createMany({ data: notifications });
    
    try {
      const io = getIO();
      for (const id of payload.userIds) {
        io.to(id).emit("notifications-refresh");
      }
    } catch (error) {}
    
    return { count: notifications.length };
  } else if (payload.sendToAll) {
    // Broadcast to ALL users
    const users = await prisma.user.findMany({ select: { id: true } });
    const notifications = users.map((u: any) => ({
      userId: u.id,
      type: payload.type || "SYSTEM",
      message: payload.message,
    }));
    await prisma.notification.createMany({ data: notifications });
    
    try {
      const io = getIO();
      io.emit("notifications-refresh"); // emit to everyone
    } catch (error) {}

    return { count: notifications.length };
  } else {
    // Single user creation (default behavior)
    const result = await prisma.notification.create({
      data: {
        userId: payload.userId,
        type: payload.type || "SYSTEM",
        message: payload.message,
      },
    });

    try {
      const io = getIO();
      if (payload.userId) {
        io.to(payload.userId).emit("new-notification", result);
      }
    } catch (error) {
      console.error("Socket emit error:", error);
    }

    return result;
  }
};

const getAllNotifications = async (query: any, actor: ActorContext) => {
  const { searchTerm, page, limit, sortBy, sortOrder, startDate, endDate, ...queryFilter } = query;

  const andCondition: Prisma.NotificationWhereInput[] = [];
  const { pageNumber, limitNumber, skip, sortOrderValue, sortByValue } =
    calculatePaginationOrSort(page, limit, sortBy, sortOrder);

  if (searchTerm) {
    andCondition.push({
      OR: notificationSearchableFields.map((text: string) => ({
        [text]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (queryFilter.isRead !== undefined) {
    queryFilter.isRead = queryFilter.isRead === "true";
  }

  const where: Prisma.NotificationWhereInput = {
    AND: andCondition.length > 0 ? andCondition : undefined,
    ...queryFilter,
    isDeleted: false,
  };

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }
  }

  const result = await prisma.notification.findMany({
    where,
    take: limitNumber,
    skip: skip,
    orderBy: { [sortByValue]: sortOrderValue },
  });

  const total = await prisma.notification.count({ where });

  return {
    data: result,
    meta: { page: pageNumber, limit: limitNumber, total },
  };
};

const getNotificationById = async (id: string, actor: ActorContext) => {
  const result = await prisma.notification.findUnique({ where: { id } });
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");

  return result;
};

const updateNotification = async (
  id: string,
  payload: any,
  actor: ActorContext,
) => {
  const isExist = await prisma.notification.findUnique({ where: { id } });
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");


  const result = await prisma.notification.update({
    where: { id },
    data: payload,
  });

  try {
    if (result.userId) {
      const io = getIO();
      io.to(result.userId).emit("notification-updated", result);
    }
  } catch (error) {
    console.error("Socket emit error:", error);
  }

  return result;
};

const deleteNotification = async (id: string, actor: ActorContext) => {
  const isExist = await prisma.notification.findUnique({ where: { id } });
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");


  await prisma.notification.update({
    where: { id },
    data: { isDeleted: true },
  });

  return { message: "Notification deleted successfully" };
};

const markAsRead = async (userId: string) => {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });

  try {
    const io = getIO();
    io.to(userId).emit("notifications-read-sync", { userId, isRead: true });
  } catch (error) {
    console.error("Socket emit error:", error);
  }

  return { message: "All notifications marked as read" };
};

export const NotificationServices = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  markAsRead,
};

