import prisma from "./prismaClient.ts";
import type { Request } from "express";
import { getIO } from "./socket.js";
import { actorFromReq } from "./tenant.ts";

export const logAction = async (
  actorId: string | undefined,
  action: "CREATE" | "UPDATE" | "DELETE",
  module: string,
  recordId: string | undefined,
  previousState: any = null,
  newState: any = null
) => {
  try {
    await prisma.actionLog.create({
      data: {
        actorId: actorId ?? null,
        action,
        module,
        recordId: recordId ?? null,
        previousState: previousState ? JSON.parse(JSON.stringify(previousState)) : null,
        newState: newState ? JSON.parse(JSON.stringify(newState)) : null,
      },
    });

    // Notify admins
    if (["CREATE", "UPDATE", "DELETE"].includes(action)) {
      const admins = await prisma.user.findMany({
        where: {
          role: { role: { in: ["SUPER_ADMIN", "ADMIN"] } }
        },
        select: { id: true }
      });

      const actionText = action.toLowerCase();
      const message = `A ${module} record was ${actionText}d.`;

      const notifications = admins.map(admin => ({
        userId: admin.id,
        type: "SYSTEM",
        message,
      }));

      if (notifications.length > 0) {
        await prisma.notification.createMany({ data: notifications });
        
        try {
          const io = getIO();
          for (const admin of admins) {
            // Frontend will listen to 'notifications-refresh' to refetch their unread count and list
            io.to(admin.id).emit("notifications-refresh");
          }
        } catch (socketErr) {
          // Socket might not be initialized during early boot or tests
        }
      }
    }

  } catch (error) {
    console.error("Failed to log action:", error);
  }
};

export const logError = async (error: Error, req?: Request) => {
  try {
    await prisma.errorLog.create({
      data: {
        message: error.message || "Unknown error",
        stack: error.stack ?? null,
        route: req ? (req.originalUrl ?? null) : null,
        method: req ? (req.method ?? null) : null,
      },
    });
  } catch (logErr) {
    console.error("Failed to log error:", logErr);
  }
};
