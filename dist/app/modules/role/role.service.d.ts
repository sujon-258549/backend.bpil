import { type ActorContext } from "../../utils/tenant.ts";
export declare const RoleServices: {
    createRole: (payload: any, actor?: ActorContext) => Promise<{
        role: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
    getAllRole: (query: any, actor?: ActorContext) => Promise<{
        data: {
            role: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            description: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getRoleById: (id: string, actor?: ActorContext) => Promise<{
        role: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
    updateRole: (id: string, payload: any, actor?: ActorContext) => Promise<{
        role: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
    deleteRole: (id: string, actor?: ActorContext) => Promise<{
        message: string;
    }>;
    updateRoleStatus: (id: string, actor?: ActorContext) => Promise<{
        role: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
};
//# sourceMappingURL=role.service.d.ts.map