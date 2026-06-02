export type ActorContext = {
    userId: string;
    role: string | undefined;
};
export declare const isPlatformAdmin: (role: string | undefined) => boolean;
export declare const tenantFilter: (actor: ActorContext) => {};
export declare const assertTenantAccess: (actor: ActorContext, recordBranchId?: string | null) => void;
import type { Request } from "express";
export declare const actorFromReq: (req: Request) => ActorContext;
//# sourceMappingURL=tenant.d.ts.map