import express from "express";
import { ProjectController } from "./project.controller.ts";
import auth from "../../utils/auth.ts";
import requirePermission from "../../middleware/requirePermission.ts";

const router = express.Router();

router.post("/", auth(), requirePermission("projects.create", "create"), ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getSingleProject);
router.patch("/:id", auth(), requirePermission("projects.project", "update"), ProjectController.updateProject);
router.delete("/:id", auth(), requirePermission("projects.project", "delete"), ProjectController.deleteProject);

export const ProjectRoutes = router;
