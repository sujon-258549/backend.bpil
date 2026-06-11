import express from "express";
import { BlogControllers } from "./blog.controller.ts";
import auth from "../../utils/auth.ts";
import requirePermission from "../../middleware/requirePermission.ts";

const router = express.Router();

// Anyone authenticated can read blogs
router.get("/",  BlogControllers.getAllBlog);
router.get("/:id",  BlogControllers.getBlogById);

// Create — requires blog.create permission
router.post(
  "/",
  auth(),
  requirePermission("blog", "create"),
  BlogControllers.createBlog,
);

// Update — requires blog.update permission
router.put(
  "/:id",
  auth(),
  requirePermission("blog", "update"),
  BlogControllers.updateBlog,
);

// Publish / Unpublish — requires blog.publish permission
router.patch(
  "/:id/status",
  auth(),
  requirePermission("blog", "publish"),
  BlogControllers.updateBlogStatus,
);

// Delete — requires blog.delete permission
router.delete(
  "/:id",
  auth(),
  requirePermission("blog", "delete"),
  BlogControllers.deleteBlog,
);

export const BlogRoutes = router;
