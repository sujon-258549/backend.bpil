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
        }[];
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
    }>;
    updateFolder: (id: string, payload: any, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
    }>;
    deleteFolder: (id: string, actor: ActorContext) => Promise<{
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        slug: string | null;
        status: boolean;
        parentId: string | null;
    }>;
};
//# sourceMappingURL=folder.services.d.ts.map