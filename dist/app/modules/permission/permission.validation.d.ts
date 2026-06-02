import { z } from "zod";
export declare const PermissionValidation: {
    createPermissionZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            roleId: z.ZodString;
            module: z.ZodString;
            permissions: z.ZodDefault<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updatePermissionZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            roleId: z.ZodOptional<z.ZodString>;
            module: z.ZodOptional<z.ZodString>;
            permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    replacePermissionsForRoleZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            permissions: z.ZodArray<z.ZodObject<{
                module: z.ZodString;
                permissions: z.ZodArray<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=permission.validation.d.ts.map