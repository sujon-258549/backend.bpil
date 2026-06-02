interface RoleWithPermissions {
    rolePermissions?: {
        module?: string | null;
        permissions?: string[];
    }[] | null;
}
export interface PermissionRow {
    module: string;
    actions: string[];
}
export declare const derivePermissionKeys: (role: RoleWithPermissions | null | undefined) => string[];
export declare const derivePermissionRows: (role: RoleWithPermissions | null | undefined) => PermissionRow[];
export {};
//# sourceMappingURL=userPermissions.d.ts.map