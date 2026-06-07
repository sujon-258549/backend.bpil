import type { ActorContext } from "../../utils/tenant.ts";
export declare const CommentServices: {
    createComment: (userId: string, payload: any, actor: ActorContext) => Promise<{
        user: ({
            profile: {
                name: string | null;
                mobile: string | null;
                id: string;
                gender: import("../../../generated/prisma/index.js").$Enums.Gender | null;
                age: number | null;
                dob: Date | null;
                bloodGroup: import("../../../generated/prisma/index.js").$Enums.BloodGroup | null;
                photoId: string | null;
                photo: string | null;
                nid: string | null;
                nidPhoto: string[];
                emailVerified: boolean;
                phoneVerified: boolean;
                nidVerified: boolean;
                serialId: string | null;
            } | null;
        } & {
            email: string | null;
            mobile: string | null;
            isBlocked: boolean;
            isDeleted: boolean;
            isVerified: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            password: string | null;
            roleId: string | null;
            designationId: string | null;
            refreshToken: string | null;
            currentDeviceId: string | null;
            currentDeviceName: string | null;
            currentDeviceType: string | null;
            currentIpAddress: string | null;
            currentUserAgent: string | null;
            passwordChanged: boolean;
            passwordChangeTime: Date | null;
            forceReload: boolean;
            lastLogin: Date | null;
            loginCount: number;
            loginTryCount: number;
            loginTryTime: Date | null;
            departmentId: string | null;
        }) | null;
    } & {
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        userId: string | null;
        comment: string | null;
    }>;
    getAllComments: (query: any, actor: ActorContext) => Promise<{
        data: ({
            user: ({
                profile: {
                    name: string | null;
                    mobile: string | null;
                    id: string;
                    gender: import("../../../generated/prisma/index.js").$Enums.Gender | null;
                    age: number | null;
                    dob: Date | null;
                    bloodGroup: import("../../../generated/prisma/index.js").$Enums.BloodGroup | null;
                    photoId: string | null;
                    photo: string | null;
                    nid: string | null;
                    nidPhoto: string[];
                    emailVerified: boolean;
                    phoneVerified: boolean;
                    nidVerified: boolean;
                    serialId: string | null;
                } | null;
            } & {
                email: string | null;
                mobile: string | null;
                isBlocked: boolean;
                isDeleted: boolean;
                isVerified: boolean;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                id: string;
                password: string | null;
                roleId: string | null;
                designationId: string | null;
                refreshToken: string | null;
                currentDeviceId: string | null;
                currentDeviceName: string | null;
                currentDeviceType: string | null;
                currentIpAddress: string | null;
                currentUserAgent: string | null;
                passwordChanged: boolean;
                passwordChangeTime: Date | null;
                forceReload: boolean;
                lastLogin: Date | null;
                loginCount: number;
                loginTryCount: number;
                loginTryTime: Date | null;
                departmentId: string | null;
            }) | null;
        } & {
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            userId: string | null;
            comment: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getCommentById: (id: string, actor: ActorContext) => Promise<{
        user: ({
            profile: {
                name: string | null;
                mobile: string | null;
                id: string;
                gender: import("../../../generated/prisma/index.js").$Enums.Gender | null;
                age: number | null;
                dob: Date | null;
                bloodGroup: import("../../../generated/prisma/index.js").$Enums.BloodGroup | null;
                photoId: string | null;
                photo: string | null;
                nid: string | null;
                nidPhoto: string[];
                emailVerified: boolean;
                phoneVerified: boolean;
                nidVerified: boolean;
                serialId: string | null;
            } | null;
        } & {
            email: string | null;
            mobile: string | null;
            isBlocked: boolean;
            isDeleted: boolean;
            isVerified: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            password: string | null;
            roleId: string | null;
            designationId: string | null;
            refreshToken: string | null;
            currentDeviceId: string | null;
            currentDeviceName: string | null;
            currentDeviceType: string | null;
            currentIpAddress: string | null;
            currentUserAgent: string | null;
            passwordChanged: boolean;
            passwordChangeTime: Date | null;
            forceReload: boolean;
            lastLogin: Date | null;
            loginCount: number;
            loginTryCount: number;
            loginTryTime: Date | null;
            departmentId: string | null;
        }) | null;
    } & {
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        userId: string | null;
        comment: string | null;
    }>;
    updateComment: (id: string, payload: any, actor: ActorContext) => Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        userId: string | null;
        comment: string | null;
    }>;
    deleteComment: (id: string, actor: ActorContext) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=comment.service.d.ts.map