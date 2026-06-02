import { type ActorContext } from "../../utils/tenant.ts";
export declare const DesignationServices: {
    createDesignation: (payload: any, actor?: ActorContext) => Promise<{
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
    }>;
    getAllDesignations: (query: any, actor?: ActorContext) => Promise<{
        data: {
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            description: string | null;
            slug: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getDesignationById: (id: string, actor?: ActorContext) => Promise<{
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
    }>;
    updateDesignation: (id: string, payload: any, actor?: ActorContext) => Promise<{
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
    }>;
    deleteDesignation: (id: string, actor?: ActorContext) => Promise<{
        message: string;
    }>;
    updateDesignationStatus: (id: string, actor?: ActorContext) => Promise<{
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
    }>;
};
//# sourceMappingURL=designation.services.d.ts.map