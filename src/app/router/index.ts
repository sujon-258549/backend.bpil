import { Router } from "express";
import { UserRouter } from "../modules/users/user.router.ts";
import { CategoryRouter } from "../modules/category/category.router.ts";
import { authRouter } from "../modules/auth/login.router.ts";
import { SubCategoryRoutes } from "../modules/subCategory/subCategory.routes.ts";
import { BlogRoutes } from "../modules/blog/blog.routes.ts";
import { MediaRoutes } from "../modules/media/media.routes.js";
import { FolderRoutes } from "../modules/folder/folder.routes.ts";
import { CommentRoutes } from "../modules/comment/comment.routes.ts";
import { NotificationRoutes } from "../modules/notification/notification.routes.ts";
import { DepartmentRouter } from "../modules/department/department.router.ts";
import { RoleRoutes } from "../modules/role/role.routes.ts";
import { PermissionRoutes } from "../modules/permission/permission.routes.ts";
import { DesignationRouter } from "../modules/designation/designation.router.ts";
import { LogRouter } from "../modules/log/log.router.ts";
import { ContactRoutes } from "../modules/contact/contact.route.ts";
import { DynamicContentRoutes } from "../modules/dynamicContent/dynamicContent.route.ts";
import { ProductRoutes } from "../modules/product/product.route.ts";
import { VideoRoutes } from "../modules/video/video.routes.ts";
import { GalleryRoutes } from "../modules/gallery/gallery.routes.ts";
import { ProjectRoutes } from "../modules/project/project.route.ts";
import { TeamMemberRoutes } from "../modules/team-member/team-member.route.ts";

const router = Router();

const allRouter = [
  { path: "/users", router: UserRouter },
  { path: "/category", router: CategoryRouter },
  { path: "/department", router: DepartmentRouter },
  { path: "/role", router: RoleRoutes },
  { path: "/permission", router: PermissionRoutes },
  { path: "/auth", router: authRouter },
  { path: "/sub-category", router: SubCategoryRoutes },
  { path: "/blog", router: BlogRoutes },
  { path: "/media", router: MediaRoutes },
  { path: "/folder", router: FolderRoutes },
  { path: "/comment", router: CommentRoutes },
  { path: "/notification", router: NotificationRoutes },
  { path: "/designation", router: DesignationRouter },
  { path: "/logs", router: LogRouter },
  { path: "/contact", router: ContactRoutes },
  { path: "/dynamic-content", router: DynamicContentRoutes },
  { path: "/products", router: ProductRoutes },
  { path: "/video", router: VideoRoutes },
  { path: "/gallery", router: GalleryRoutes },
  { path: "/projects", router: ProjectRoutes },
  { path: "/team-members", router: TeamMemberRoutes },
];

allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
