import { Router } from "express";
import { GalleryController } from "./gallery.controller.ts";
import validateRequest from "../../middleware/validateRequest.ts";
import { GalleryValidation } from "./gallery.validation.ts";
import auth from "../../utils/auth.ts";

const router = Router();

router.post(
  "/",
  auth(),
  validateRequest(GalleryValidation.createGalleryZodSchema),
  GalleryController.createGallery,
);
router.get("/", auth(), GalleryController.getAllGallery);
router.get("/:id", auth(), GalleryController.getGalleryById);
router.put(
  "/:id",
  auth(),
  validateRequest(GalleryValidation.updateGalleryZodSchema),
  GalleryController.updateGallery,
);
router.delete("/:id", auth(), GalleryController.deleteGallery);
router.patch("/:id/status", auth(), GalleryController.updateGalleryStatus);

export const GalleryRoutes = router;
