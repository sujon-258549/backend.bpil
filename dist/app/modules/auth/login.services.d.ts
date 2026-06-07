export declare const AuthServices: {
    loginUser: (payload: any) => Promise<{
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
                mobile?: string | null;
                isBlocked?: boolean;
                isDeleted?: boolean;
                id?: string;
                passwordChanged?: boolean;
                passwordChangeTime?: Date | null;
                experience?: string | null;
                workType?: string | null;
                workStartTime?: string | null;
                workTimeLimit?: string | null;
                availableTime?: string | null;
                verified?: boolean;
            };
            isActive: true;
            isVerified: boolean;
            isBlocked: false;
            isDeleted: false;
            permissions: import("../../utils/userPermissions.ts").PermissionRow[];
        };
        isLogin: boolean;
    }>;
    refreshToken: (token: string) => Promise<{
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
                mobile?: string | null;
                isBlocked?: boolean;
                isDeleted?: boolean;
                id?: string;
                passwordChanged?: boolean;
                passwordChangeTime?: Date | null;
                experience?: string | null;
                workType?: string | null;
                workStartTime?: string | null;
                workTimeLimit?: string | null;
                availableTime?: string | null;
                verified?: boolean;
            };
            isActive: boolean;
            isVerified: boolean;
            isBlocked: boolean;
            isDeleted: boolean;
            permissions: import("../../utils/userPermissions.ts").PermissionRow[];
        };
    }>;
    logoutUser: (refreshToken: string) => Promise<void>;
    forgotPassword: (payload: {
        email: string;
    }) => Promise<{
        message: string;
    }>;
    resetPassword: (email: string, password: string, otp: string) => Promise<{
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
                mobile?: string | null;
                isBlocked?: boolean;
                isDeleted?: boolean;
                id?: string;
                passwordChanged?: boolean;
                passwordChangeTime?: Date | null;
                experience?: string | null;
                workType?: string | null;
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
};
//# sourceMappingURL=login.services.d.ts.map