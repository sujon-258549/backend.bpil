export declare const LogServices: {
    getActionLogs: (query: any) => Promise<{
        data: ({
            actor: {
                email: string | null;
                id: string;
                profile: {
                    name: string | null;
                } | null;
            } | null;
        } & {
            createdAt: Date;
            id: string;
            action: string;
            module: string;
            recordId: string | null;
            previousState: import("../../../generated/prisma/runtime/client.js").JsonValue | null;
            newState: import("../../../generated/prisma/runtime/client.js").JsonValue | null;
            actorId: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getErrorLogs: (query: any) => Promise<{
        data: {
            createdAt: Date;
            id: string;
            message: string;
            stack: string | null;
            route: string | null;
            method: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
};
//# sourceMappingURL=log.service.d.ts.map