import { type ActorContext } from "../../utils/tenant.ts";
export declare const MediaServices: {
    createFolder: (payload: any, actor?: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    getAllFolders: (query: any, actor?: ActorContext) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            folders: any[];
            images: {
                name: string | null;
                url: string | null;
                id: string;
            }[];
        };
    }>;
    getFolderById: (id: string, actor?: ActorContext) => Promise<{
        children: any[];
        images: {
            name: string | null;
            url: string | null;
            id: string;
        }[];
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    deleteFolder: (id: string, actor?: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    updateFolder: (id: string, payload: any, actor?: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    createImage: (payload: {
        name: string;
        url: string;
        folderId?: string;
    }, actor?: ActorContext) => Promise<{
        name: string | null;
        url: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        folderId: string | null;
        status: boolean;
        zoomFileId: number | null;
    }>;
    getImagesByFolder: (folderId?: string | null, actor?: ActorContext) => Promise<{
        name: string | null;
        url: string | null;
        id: string;
    }[]>;
    deleteImage: (id: string, actor?: ActorContext) => Promise<{
        name: string | null;
        url: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        folderId: string | null;
        status: boolean;
        zoomFileId: number | null;
    }>;
    updateImage: (id: string, payload: {
        name: string;
    }, actor?: ActorContext) => Promise<{
        name: string | null;
        url: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        folderId: string | null;
        status: boolean;
        zoomFileId: number | null;
    }>;
};
//# sourceMappingURL=media.service.d.ts.map