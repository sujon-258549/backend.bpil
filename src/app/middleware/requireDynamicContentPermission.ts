import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import prisma from "../utils/prismaClient.ts";
import ApiError from "./apiError.ts";
import catchAsync from "../shared/catchAsync.ts";
import { USER_ROLE } from "../modules/users/user.constant.ts";

export const requireDynamicContentPermission = (action: string) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new ApiError(status.UNAUTHORIZED, "🔍❓ Unauthorized");
    }

    if (req.user?.role === USER_ROLE.SUPER_ADMIN) {
      return next();
    }

    // Determine group and key
    let group = req.body?.group || req.params?.group || req.query?.group;
    let key = req.body?.key || req.params?.key;

    // If no group is explicitly provided, derive it from the key (e.g. for DELETE /:key)
    if (!group && key) {
      const content = await prisma.dynamicContent.findUnique({
        where: { key: key },
        select: { group: true }
      });
      if (content) {
        group = content.group;
      }
    }

    // For bulk actions, we might need to check multiple groups or assume the first item's group
    if (!group && Array.isArray(req.body) && req.body.length > 0) {
      group = req.body[0]?.group;
      key = req.body[0]?.key;
    }

    if (!group) {
        throw new ApiError(status.FORBIDDEN, "🔒 Cannot determine content group for permission check");
    }

    // Map group to moduleKey base
    let baseModule = `content.${group}`;
    if (group === "gallery") {
      baseModule = "content.image";
    }

    // Construct specific tab permission key if possible
    let moduleKey = baseModule;
    if (key && key.startsWith(`${group}-`)) {
      const suffix = key.replace(`${group}-`, "");
      moduleKey = `${baseModule}.${suffix}`;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { roleId: true },
    });
    
    if (!user?.roleId) {
      throw new ApiError(
        status.FORBIDDEN,
        `🔒 No role assigned — access to "${moduleKey}" denied`,
      );
    }

    const row = await prisma.rolePermission.findFirst({
      where: { roleId: user.roleId, module: moduleKey },
      select: { permissions: true },
    });
    
    if (!row) {
      throw new ApiError(
        status.FORBIDDEN,
        `🔒 Permission for "${moduleKey}" not granted`,
      );
    }

    if (!row.permissions.includes(action)) {
      throw new ApiError(
        status.FORBIDDEN,
        `🔒 "${action}" on "${moduleKey}" not allowed`,
      );
    }

    next();
  });
};
