import { Router } from "express";
import { FolderController } from "./folder.controller.ts";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/", FolderController.createFolder);
router.get("/", FolderController.getAllFolders);
router.get("/:id", FolderController.getFolderById);
router.put("/:id", FolderController.updateFolder);
router.delete("/:id", FolderController.deleteFolder);

router.post("/upload", upload.single("file"), FolderController.uploadFile);
router.get("/image/:id", FolderController.getImageProxy);
router.put("/image/:id", FolderController.updateImage);
router.delete("/image/:id", FolderController.deleteImage);

export const FolderRoutes = router;
