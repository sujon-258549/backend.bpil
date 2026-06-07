import express from "express";
import { ContactController } from "./contact.controller.ts";

import auth from "../../utils/auth.ts";

const router = express.Router();

router.post("/", ContactController.submitContactForm);

// Admin only routes
router.get("/", auth(), ContactController.getAllContacts);
router.patch("/:id", auth(), ContactController.updateContactStatus);
router.delete("/:id", auth(), ContactController.deleteContact);

export const ContactRoutes = router;
