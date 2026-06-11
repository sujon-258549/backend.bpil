import express from "express";
import { DynamicContentController } from "./dynamicContent.controller.ts";
import auth from "../../utils/auth.ts";
import { requireDynamicContentPermission } from "../../middleware/requireDynamicContentPermission.ts";

const router = express.Router();

// Public routes (for frontend)
router.get("/map", DynamicContentController.getDynamicContentsMap);
router.get("/group/:group", DynamicContentController.getDynamicContentsByGroup);

// Admin routes
router.get(
  "/all",
  auth(),
  requireDynamicContentPermission("read"),
  DynamicContentController.getAllDynamicContents
);

router.post(
  "/upsert",
  auth(),
  requireDynamicContentPermission("update"),
  DynamicContentController.upsertDynamicContent
);

router.post(
  "/bulk-upsert",
  auth(),
  requireDynamicContentPermission("update"),
  DynamicContentController.bulkUpsertDynamicContents
);

router.delete(
  "/bulk-delete",
  auth(),
  requireDynamicContentPermission("delete"),
  DynamicContentController.bulkDeleteDynamicContents
);

router.delete(
  "/:key",
  auth(),
  requireDynamicContentPermission("delete"),
  DynamicContentController.deleteDynamicContent
);

export const DynamicContentRoutes = router;
