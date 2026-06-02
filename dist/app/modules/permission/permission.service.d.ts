import { type ActorContext } from "../../utils/tenant.ts";
export declare const PermissionServices: {
    createPermission: (payload: any, actor?: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        roleId: string | null;
        module: string | null;
        permissions: string[];
    }>;
    getAllPermission: (query: any, actor?: ActorContext) => Promise<{
        data: ({
            role: {
                role: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                id: string;
                description: string | null;
            } | null;
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            roleId: string | null;
            module: string | null;
            permissions: string[];
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getPermissionById: (id: string, actor?: ActorContext) => Promise<{
        role: {
            role: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            description: string | null;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: string;
        roleId: string | null;
        module: string | null;
        permissions: string[];
    }>;
    getPermissionsByRole: (roleId: string, actor?: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        roleId: string | null;
        module: string | null;
        permissions: string[];
    }[]>;
    updatePermission: (id: string, payload: any, actor?: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        roleId: string | null;
        module: string | null;
        permissions: string[];
    }>;
    deletePermission: (id: string, actor?: ActorContext) => Promise<{
        message: string;
    }>;
    replacePermissionsForRole: (roleId: string, permissions: {
        module: string;
        permissions: string[];
    }[], actor?: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        roleId: string | null;
        module: string | null;
        permissions: string[];
    }[]>;
};
//# sourceMappingURL=permission.service.d.ts.map