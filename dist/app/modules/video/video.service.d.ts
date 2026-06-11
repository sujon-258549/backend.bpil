import type { ActorContext } from "../../utils/tenant.ts";
export declare const VideoServices: {
    createVideoIntoDB: (payload: any, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        title: string;
        duration: string | null;
        posterAlt: string | null;
        youtubeId: string;
        posterId: string | null;
    }>;
    getAllVideo: (query: any, actor: ActorContext) => Promise<{
        data: ({
            poster: {
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
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            category: string | null;
            title: string;
            duration: string | null;
            posterAlt: string | null;
            youtubeId: string;
            posterId: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getVideoById: (id: string, actor: ActorContext) => Promise<{
        poster: {
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
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        title: string;
        duration: string | null;
        posterAlt: string | null;
        youtubeId: string;
        posterId: string | null;
    }>;
    updateVideo: (id: string, payload: any, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        title: string;
        duration: string | null;
        posterAlt: string | null;
        youtubeId: string;
        posterId: string | null;
    }>;
    deleteVideo: (id: string, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        title: string;
        duration: string | null;
        posterAlt: string | null;
        youtubeId: string;
        posterId: string | null;
    }>;
    updateVideoStatus: (id: string, actor: ActorContext) => Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string | null;
        title: string;
        duration: string | null;
        posterAlt: string | null;
        youtubeId: string;
        posterId: string | null;
    }>;
};
//# sourceMappingURL=video.service.d.ts.map