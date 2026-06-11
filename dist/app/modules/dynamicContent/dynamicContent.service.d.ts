export declare const DynamicContentService: {
    upsertDynamicContent: (payload: any, userId?: string) => Promise<{
        image: string | null;
        url: string | null;
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        type: string;
        value: import("../../../generated/prisma/runtime/client.js").JsonValue | null;
        key: string;
        imageId: string | null;
        group: string;
        updatedById: string | null;
    }>;
    bulkUpsertDynamicContents: (contents: any[], userId?: string) => Promise<{
        image: string | null;
        url: string | null;
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        type: string;
        value: import("../../../generated/prisma/runtime/client.js").JsonValue | null;
        key: string;
        imageId: string | null;
        group: string;
        updatedById: string | null;
    }[]>;
    getDynamicContentsByGroup: (group: string) => Promise<any[]>;
    getDynamicContentsMap: (group?: string) => Promise<any>;
    deleteDynamicContent: (key: string) => Promise<{
        name: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        type: string;
        value: import("../../../generated/prisma/runtime/client.js").JsonValue | null;
        key: string;
        imageId: string | null;
        group: string;
        updatedById: string | null;
    }>;
    bulkDeleteDynamicContents: (keys: string[]) => Promise<import("../../../generated/prisma/index.js").Prisma.BatchPayload>;
    getAllDynamicContents: (query: any) => Promise<any[]>;
};
//# sourceMappingURL=dynamicContent.service.d.ts.map