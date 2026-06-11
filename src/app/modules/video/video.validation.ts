import { z } from "zod";

const createVideoZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().optional(),
    duration: z.string().optional(),
    posterId: z.string().optional(),
    posterAlt: z.string().optional(),
    youtubeId: z.string().min(1, "YouTube ID is required"),
    isActive: z.boolean().optional(),
  }),
});

const updateVideoZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    duration: z.string().optional(),
    posterId: z.string().optional(),
    posterAlt: z.string().optional(),
    youtubeId: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const VideoValidation = {
  createVideoZodSchema,
  updateVideoZodSchema,
};
