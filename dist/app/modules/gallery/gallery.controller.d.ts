import type { NextFunction, Request, Response } from "express";
export declare const GalleryController: {
    createGallery: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllGallery: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getGalleryById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateGallery: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteGallery: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateGalleryStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=gallery.controller.d.ts.map