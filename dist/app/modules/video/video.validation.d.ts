import { z } from "zod";
export declare const VideoValidation: {
    createVideoZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodString;
            category: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodString>;
            posterId: z.ZodOptional<z.ZodString>;
            posterAlt: z.ZodOptional<z.ZodString>;
            youtubeId: z.ZodString;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateVideoZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            category: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodString>;
            posterId: z.ZodOptional<z.ZodString>;
            posterAlt: z.ZodOptional<z.ZodString>;
            youtubeId: z.ZodOptional<z.ZodString>;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=video.validation.d.ts.map