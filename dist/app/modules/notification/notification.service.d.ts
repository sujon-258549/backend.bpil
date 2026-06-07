import type { ActorContext } from "../../utils/tenant.ts";
export declare const NotificationServices: {
    createNotification: (payload: any, actor: ActorContext) => Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        message: string | null;
        userId: string | null;
        type: string | null;
        isRead: boolean;
    } | {
        count: any;
    }>;
    getAllNotifications: (query: any, actor: ActorContext) => Promise<{
        data: {
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            message: string | null;
            userId: string | null;
            type: string | null;
            isRead: boolean;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getNotificationById: (id: string, actor: ActorContext) => Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        message: string | null;
        userId: string | null;
        type: string | null;
        isRead: boolean;
    }>;
    updateNotification: (id: string, payload: any, actor: ActorContext) => Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        message: string | null;
        userId: string | null;
        type: string | null;
        isRead: boolean;
    }>;
    deleteNotification: (id: string, actor: ActorContext) => Promise<{
        message: string;
    }>;
    markAsRead: (userId: string) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=notification.service.d.ts.map