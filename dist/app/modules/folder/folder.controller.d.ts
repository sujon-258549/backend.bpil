import type { Request, Response } from "express";
export declare const FolderController: {
    createFolder: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllFolders: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getFolderById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateFolder: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteFolder: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    uploadFile: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getImageProxy: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getImageDetails: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateImage: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteImage: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=folder.controller.d.ts.map