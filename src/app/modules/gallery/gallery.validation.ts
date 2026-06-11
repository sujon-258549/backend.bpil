import { z } from "zod";

const createGalleryZodSchema = z.object({
  body: z.object({
    alt: z.string().min(1, "Alt text is required"),
    category: z.string().optional(),
    imageId: z.string().min(1, "Image is required"),
    isActive: z.boolean().optional(),
  }),
});

const updateGalleryZodSchema = z.object({
  body: z.object({
    alt: z.string().optional(),
    category: z.string().optional(),
    imageId: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const GalleryValidation = {
  createGalleryZodSchema,
  updateGalleryZodSchema,
};
