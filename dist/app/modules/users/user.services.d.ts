import { type ActorContext } from "../../utils/tenant.ts";
export declare const UserServices: {
    createUserIntoDB: (payload: any) => Promise<any>;
    getUserById: (id: string, actor?: ActorContext) => Promise<{
        password: undefined;
        permissions: import("../../utils/userPermissions.ts").PermissionRow[];
        role: {
            role: string | null;
            rolePermissions: {
                module: string | null;
                permissions: string[];
            }[];
            id: string;
        } | null;
        department: {
            name: string | null;
            id: string;
        } | null;
        designation: {
            name: string;
            id: string;
        } | null;
        profile: ({
            profilePhoto: {
                url: string | null;
                id: string;
            } | null;
            nidPhotos: {
                url: string | null;
                id: string;
            }[];
        } & {
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
        }) | null;
        address: {
            mobile: string | null;
            id: string;
            address: string | null;
            division: string | null;
            district: string | null;
            upazila: string | null;
        } | null;
        workInfo: ({
            subCategories: {
                name: string | null;
                id: string;
            }[];
        } & {
            mobile: string | null;
            isBlocked: boolean;
            isDeleted: boolean;
            id: string;
            passwordChanged: boolean;
            passwordChangeTime: Date | null;
            experience: string | null;
            workStartTime: string | null;
            workTimeLimit: string | null;
            availableTime: string | null;
            verified: boolean;
        }) | null;
        email: string | null;
        mobile: string | null;
        isBlocked: boolean;
        isDeleted: boolean;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
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
    } | null>;
    getAllUsers: (query: any, actor?: ActorContext) => Promise<{
        data: {
            permissions: import("../../utils/userPermissions.ts").PermissionRow[];
            role: {
                role: string | null;
                rolePermissions: {
                    module: string | null;
                    permissions: string[];
                }[];
                id: string;
            } | null;
            department: {
                name: string | null;
                id: string;
            } | null;
            designation: {
                name: string;
                id: string;
            } | null;
            profile: ({
                profilePhoto: {
                    url: string | null;
                    id: string;
                } | null;
                nidPhotos: {
                    url: string | null;
                    id: string;
                }[];
            } & {
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
            }) | null;
            address: {
                mobile: string | null;
                id: string;
                address: string | null;
                division: string | null;
                district: string | null;
                upazila: string | null;
            } | null;
            workInfo: ({
                subCategories: {
                    name: string | null;
                    id: string;
                }[];
            } & {
                mobile: string | null;
                isBlocked: boolean;
                isDeleted: boolean;
                id: string;
                passwordChanged: boolean;
                passwordChangeTime: Date | null;
                experience: string | null;
                workStartTime: string | null;
                workTimeLimit: string | null;
                availableTime: string | null;
                verified: boolean;
            }) | null;
            email: string | null;
            mobile: string | null;
            isBlocked: boolean;
            isDeleted: boolean;
            isVerified: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: string;
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
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    updateUser: (id: string, payload: any, currentUserId?: string, actor?: ActorContext) => Promise<{
        role: {
            role: string | null;
            rolePermissions: {
                module: string | null;
                permissions: string[];
            }[];
            id: string;
        } | null;
        department: {
            name: string | null;
            id: string;
        } | null;
        designation: {
            name: string;
            id: string;
        } | null;
        profile: ({
            profilePhoto: {
                url: string | null;
                id: string;
            } | null;
            nidPhotos: {
                url: string | null;
                id: string;
            }[];
        } & {
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
        }) | null;
        address: {
            mobile: string | null;
            id: string;
            address: string | null;
            division: string | null;
            district: string | null;
            upazila: string | null;
        } | null;
        workInfo: ({
            subCategories: {
                name: string | null;
                id: string;
            }[];
        } & {
            mobile: string | null;
            isBlocked: boolean;
            isDeleted: boolean;
            id: string;
            passwordChanged: boolean;
            passwordChangeTime: Date | null;
            experience: string | null;
            workStartTime: string | null;
            workTimeLimit: string | null;
            availableTime: string | null;
            verified: boolean;
        }) | null;
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
    }>;
    getMyData: (id: string) => Promise<{
        password: undefined;
        permissions: import("../../utils/userPermissions.ts").PermissionRow[];
        role: {
            role: string | null;
            rolePermissions: {
                module: string | null;
                permissions: string[];
            }[];
            id: string;
        } | null;
        department: {
            name: string | null;
            id: string;
        } | null;
        designation: {
            name: string;
            id: string;
        } | null;
        profile: ({
            profilePhoto: {
                url: string | null;
                id: string;
            } | null;
            nidPhotos: {
                url: string | null;
                id: string;
            }[];
        } & {
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
        }) | null;
        address: {
            mobile: string | null;
            id: string;
            address: string | null;
            division: string | null;
            district: string | null;
            upazila: string | null;
        } | null;
        workInfo: ({
            subCategories: {
                name: string | null;
                id: string;
            }[];
        } & {
            mobile: string | null;
            isBlocked: boolean;
            isDeleted: boolean;
            id: string;
            passwordChanged: boolean;
            passwordChangeTime: Date | null;
            experience: string | null;
            workStartTime: string | null;
            workTimeLimit: string | null;
            availableTime: string | null;
            verified: boolean;
        }) | null;
        email: string | null;
        mobile: string | null;
        isBlocked: boolean;
        isDeleted: boolean;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
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
    }>;
    getMyDataAndClearReload: (id: string) => Promise<{
        password: undefined;
        permissions: import("../../utils/userPermissions.ts").PermissionRow[];
        role: {
            role: string | null;
            rolePermissions: {
                module: string | null;
                permissions: string[];
            }[];
            id: string;
        } | null;
        department: {
            name: string | null;
            id: string;
        } | null;
        designation: {
            name: string;
            id: string;
        } | null;
        profile: ({
            profilePhoto: {
                url: string | null;
                id: string;
            } | null;
            nidPhotos: {
                url: string | null;
                id: string;
            }[];
        } & {
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
        }) | null;
        address: {
            mobile: string | null;
            id: string;
            address: string | null;
            division: string | null;
            district: string | null;
            upazila: string | null;
        } | null;
        workInfo: ({
            subCategories: {
                name: string | null;
                id: string;
            }[];
        } & {
            mobile: string | null;
            isBlocked: boolean;
            isDeleted: boolean;
            id: string;
            passwordChanged: boolean;
            passwordChangeTime: Date | null;
            experience: string | null;
            workStartTime: string | null;
            workTimeLimit: string | null;
            availableTime: string | null;
            verified: boolean;
        }) | null;
        email: string | null;
        mobile: string | null;
        isBlocked: boolean;
        isDeleted: boolean;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: string;
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
    }>;
    changePassword: (payload: {
        oldPassword: string;
        newPassword: string;
    }, id: string) => Promise<{
        accessToken: never;
        refreshToken: never;
        user: {
            id: string;
            email: string | null;
            mobile: string | null;
            name: string | null | undefined;
            photo: string | null | undefined;
            role: string | null | undefined;
            gender: import("../../../generated/prisma/index.js").$Enums.Gender | null | undefined;
            bloodGroup: import("../../../generated/prisma/index.js").$Enums.BloodGroup | null | undefined;
            age: number | null | undefined;
            designation: string | null | undefined;
            department: string | null | undefined;
            address: {
                mobile: string | null;
                id: string;
                address: string | null;
                division: string | null;
                district: string | null;
                upazila: string | null;
            } | null;
            workInfo: {
                subCategories: (string | null)[] | undefined;
                mobile?: string | null;
                isBlocked?: boolean;
                isDeleted?: boolean;
                id?: string;
                passwordChanged?: boolean;
                passwordChangeTime?: Date | null;
                experience?: string | null;
                workStartTime?: string | null;
                workTimeLimit?: string | null;
                availableTime?: string | null;
                verified?: boolean;
            };
            isActive: boolean;
            isVerified: boolean;
            isBlocked: boolean;
            isDeleted: boolean;
        };
        isLogin: boolean;
    }>;
    varifyOtp: (email: string, otp: string) => Promise<{
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
    }>;
    deleteUser: (id: string, currentUserId?: string, actor?: ActorContext) => Promise<never[]>;
    softDeleteUser: (id: string, currentUserId?: string, actor?: ActorContext) => Promise<{
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
    }>;
    blockUser: (id: string, currentUserId?: string, actor?: ActorContext) => Promise<{
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
    }>;
};
//# sourceMappingURL=user.services.d.ts.map