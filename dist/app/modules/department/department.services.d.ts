import type { ActorContext } from "../../utils/tenant.ts";
export declare const DepartmentServices: {
    createDepartmentIntoDB: (payload: any, actor: ActorContext) => Promise<{
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
    getAllDepartment: (query: any, actor: ActorContext) => Promise<{
        data: ({
            users: {
                email: string | null;
                mobile: string | null;
                id: string;
                roleId: string | null;
            }[];
        } & {
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            description: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getDepartmentById: (id: string, actor: ActorContext) => Promise<{
        users: {
            email: string | null;
            mobile: string | null;
            id: string;
            roleId: string | null;
        }[];
    } & {
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
    updateDepartment: (id: string, payload: any, actor: ActorContext) => Promise<{
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
    deleteDepartment: (id: string, actor: ActorContext) => Promise<{
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
    updateDepartmentStatus: (id: string, actor: ActorContext) => Promise<{
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
    }>;
};
//# sourceMappingURL=department.services.d.ts.map