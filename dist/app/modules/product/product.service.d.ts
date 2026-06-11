import type { IProductFilterRequest } from "./product.interface.ts";
export declare const ProductService: {
    createProduct: (payload: any) => Promise<{
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        slug: string | null;
        thumbnailId: string | null;
        price: string | null;
        shortDesc: string | null;
        detailsDesc: string | null;
    }>;
    getAllProducts: (filters: IProductFilterRequest, paginationOptions: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            gallery: {
                name: string | null;
                url: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: string;
                slug: string | null;
                folderId: string | null;
                status: boolean;
                zoomFileId: number | null;
            }[];
            thumbnail: {
                name: string | null;
                url: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: string;
                slug: string | null;
                folderId: string | null;
                status: boolean;
                zoomFileId: number | null;
            } | null;
        } & {
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            category: string | null;
            slug: string | null;
            thumbnailId: string | null;
            price: string | null;
            shortDesc: string | null;
            detailsDesc: string | null;
        })[];
    }>;
    getSingleProduct: (id: string) => Promise<{
        gallery: {
            name: string | null;
            url: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            slug: string | null;
            folderId: string | null;
            status: boolean;
            zoomFileId: number | null;
        }[];
        thumbnail: {
            name: string | null;
            url: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            slug: string | null;
            folderId: string | null;
            status: boolean;
            zoomFileId: number | null;
        } | null;
    } & {
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        slug: string | null;
        thumbnailId: string | null;
        price: string | null;
        shortDesc: string | null;
        detailsDesc: string | null;
    }>;
    updateProduct: (id: string, payload: any) => Promise<{
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        slug: string | null;
        thumbnailId: string | null;
        price: string | null;
        shortDesc: string | null;
        detailsDesc: string | null;
    }>;
    deleteProduct: (id: string) => Promise<{
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        slug: string | null;
        thumbnailId: string | null;
        price: string | null;
        shortDesc: string | null;
        detailsDesc: string | null;
    }>;
};
//# sourceMappingURL=product.service.d.ts.map