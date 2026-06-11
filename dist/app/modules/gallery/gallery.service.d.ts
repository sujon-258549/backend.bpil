import type { ActorContext } from "../../utils/tenant.ts";
export declare const GalleryServices: {
    createGalleryIntoDB: (payload: any, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        imageId: string;
        alt: string;
    }>;
    getAllGallery: (query: any, actor: ActorContext) => Promise<{
        data: ({
            image: {
                name: string | null;
                url: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: string;
                slug: string | null;
                folderId: string | null;
                status: boolean;
                zoomFileId: number | null;
            };
        } & {
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            category: string | null;
            imageId: string;
            alt: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getGalleryById: (id: string, actor: ActorContext) => Promise<{
        image: {
            name: string | null;
            url: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            slug: string | null;
            folderId: string | null;
            status: boolean;
            zoomFileId: number | null;
        };
    } & {
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        imageId: string;
        alt: string;
    }>;
    updateGallery: (id: string, payload: any, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        imageId: string;
        alt: string;
    }>;
    deleteGallery: (id: string, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        imageId: string;
        alt: string;
    }>;
    updateGalleryStatus: (id: string, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        imageId: string;
        alt: string;
    }>;
};
//# sourceMappingURL=gallery.service.d.ts.map