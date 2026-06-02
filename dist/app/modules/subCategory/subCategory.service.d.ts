import { type ActorContext } from "../../utils/tenant.ts";
export declare const SubCategoryServices: {
    createSubCategory: (payload: any, actor?: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        categoryId: string | null;
        icon: string | null;
    }>;
    getAllSubCategory: (query: any, actor?: ActorContext) => Promise<{
        data: ({
            category: {
                name: string | null;
                slug: string | null;
            } | null;
        } & {
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            description: string | null;
            slug: string | null;
            status: boolean;
            categoryId: string | null;
            icon: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getSubCategoryById: (id: string, actor?: ActorContext) => Promise<{
        category: {
            name: string | null;
            id: string;
            slug: string | null;
        } | null;
    } & {
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        categoryId: string | null;
        icon: string | null;
    }>;
    getSubCategoryBySlug: (slug: string) => Promise<{
        category: {
            name: string | null;
            id: string;
            slug: string | null;
        } | null;
    } & {
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        categoryId: string | null;
        icon: string | null;
    }>;
    updateSubCategory: (id: string, payload: any, actor?: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        categoryId: string | null;
        icon: string | null;
    }>;
    deleteSubCategory: (id: string, actor?: ActorContext) => Promise<{
        message: string;
    }>;
    updateSubCategoryStatus: (id: string, actor?: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        slug: string | null;
        status: boolean;
        categoryId: string | null;
        icon: string | null;
    }>;
};
//# sourceMappingURL=subCategory.service.d.ts.map