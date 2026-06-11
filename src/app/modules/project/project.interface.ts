import { ProjectStatus } from "../../../generated/prisma/index.js";

export type IProjectFilterRequest = {
  searchTerm?: string | undefined;
  isActive?: boolean | string | undefined;
  category?: string | undefined;
  status?: ProjectStatus | undefined;
};
