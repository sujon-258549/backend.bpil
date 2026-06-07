import type { Request } from "express";
export declare const logAction: (actorId: string | undefined, action: "CREATE" | "UPDATE" | "DELETE", module: string, recordId: string | undefined, previousState?: any, newState?: any) => Promise<void>;
export declare const logError: (error: Error, req?: Request) => Promise<void>;
//# sourceMappingURL=logger.service.d.ts.map