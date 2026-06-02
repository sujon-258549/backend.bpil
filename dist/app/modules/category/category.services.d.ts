import type { ActorContext } from "../../utils/tenant.ts";
export declare const CategoryServices: {
    createCategoryIntoDB: (payload: any, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        icon: string | null;
    }>;
    getAllCategory: (query: any, actor: ActorContext) => Promise<{
        data: ({
            subCategories: {
                name: string | null;
                id: string;
                slug: string | null;
                icon: string | null;
            }[];
        } & {
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            description: string | null;
            slug: string | null;
            status: boolean;
            icon: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getCategoryById: (id: string, actor: ActorContext) => Promise<{
        subCategories: {
            name: string | null;
            id: string;
            slug: string | null;
            icon: string | null;
        }[];
    } & {
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        icon: string | null;
    }>;
    updateCategory: (id: string, payload: any, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        icon: string | null;
    }>;
    deleteCategory: (id: string, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        icon: string | null;
    }>;
    updateCategoryStatus: (id: string, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        icon: string | null;
    }>;
};
//# sourceMappingURL=category.services.d.ts.map