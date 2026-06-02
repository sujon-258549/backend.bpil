import { USER_ROLE } from "../modules/users/user.constant.ts";
import ApiError from "../middleware/apiError.ts";
import httpStatus from "http-status";

export type ActorContext = {
  userId: string;
  role: string | undefined;
};

export const isPlatformAdmin = (role: string | undefined): boolean =>
  role === USER_ROLE.SUPER_ADMIN || role === USER_ROLE.ADMIN;

// Single project mode: no tenant filter required.
export const tenantFilter = (
  actor: ActorContext,
): {} => {
  return {};
};

// Single project mode: always returns true.
export const assertTenantAccess = (
  actor: ActorContext,
  recordBranchId?: string | null,
): void => {
  // No-op
};

// Extract actor from Express request (used by controllers).
import type { Request } from "express";
export const actorFromReq = (req: Request): ActorContext => ({
  userId: req.user?.id as string,
  role: req.user?.role,
});
