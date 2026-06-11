import type { Request, Response } from "express";
export declare const DynamicContentController: {
    upsertDynamicContent: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    bulkUpsertDynamicContents: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getDynamicContentsByGroup: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getDynamicContentsMap: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllDynamicContents: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteDynamicContent: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    bulkDeleteDynamicContents: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=dynamicContent.controller.d.ts.map