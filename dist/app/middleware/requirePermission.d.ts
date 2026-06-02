import type { NextFunction, Request, Response } from "express";
declare const requirePermission: (moduleKey: string, action?: string) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default requirePermission;
//# sourceMappingURL=requirePermission.d.ts.map