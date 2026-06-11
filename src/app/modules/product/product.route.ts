import express from "express";
import { ProductController } from "./product.controller.ts";
import auth from "../../utils/auth.ts";
import requirePermission from "../../middleware/requirePermission.ts";

const router = express.Router();

router.post("/", auth(), requirePermission("products.create", "create"), ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);
router.patch("/:id", auth(), requirePermission("products.list", "update"), ProductController.updateProduct);
router.delete("/:id", auth(), requirePermission("products.list", "delete"), ProductController.deleteProduct);

export const ProductRoutes = router;
