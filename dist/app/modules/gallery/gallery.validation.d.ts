import { z } from "zod";
export declare const GalleryValidation: {
    createGalleryZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            alt: z.ZodString;
            category: z.ZodOptional<z.ZodString>;
            imageId: z.ZodString;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateGalleryZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            alt: z.ZodOptional<z.ZodString>;
            category: z.ZodOptional<z.ZodString>;
            imageId: z.ZodOptional<z.ZodString>;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=gallery.validation.d.ts.map