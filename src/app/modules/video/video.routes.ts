import { Router } from "express";
import { VideoController } from "./video.controller.ts";
import validateRequest from "../../middleware/validateRequest.ts";
import { VideoValidation } from "./video.validation.ts";
import auth from "../../utils/auth.ts";

const router = Router();
router.post(
  "/",
  auth(),
  validateRequest(VideoValidation.createVideoZodSchema),
  VideoController.createVideo,
);
router.get("/", auth(), VideoController.getAllVideo);
router.get("/:id", auth(), VideoController.getVideoById);
router.put(
  "/:id",
  auth(),
  validateRequest(VideoValidation.updateVideoZodSchema),
  VideoController.updateVideo,
);
router.delete("/:id", auth(), VideoController.deleteVideo);
router.patch("/:id/status", auth(), VideoController.updateVideoStatus);

export const VideoRoutes = router;
