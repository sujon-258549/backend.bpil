import type { ActorContext } from "../../utils/tenant.ts";
export declare const FolderServices: {
    createFolder: (payload: any, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    getAllFolders: (query: any, actor: ActorContext) => Promise<{
        data: {
            folders: any[];
            images: {
                name: string | null;
                url: string | null;
                id: string;
            }[];
        };
    }>;
    getFolderById: (id: string, actor: ActorContext) => Promise<{
        children: any[];
        images: {
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
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    updateFolder: (id: string, payload: any, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    deleteFolder: (id: string, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
        zoomFolderId: number | null;
    }>;
    uploadFile: (file: Express.Multer.File, folderId?: string, actor?: ActorContext) => Promise<{
        name: string | null;
        url: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        folderId: string | null;
        status: boolean;
        zoomFileId: number | null;
    } | undefined>;
    getImageProxy: (id: string) => Promise<{
        url: string;
    }>;
    getImageDetails: (id: string, actor?: ActorContext) => Promise<{
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
};
//# sourceMappingURL=folder.services.d.ts.map