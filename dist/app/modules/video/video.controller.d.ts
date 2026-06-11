import type { NextFunction, Request, Response } from "express";
export declare const VideoController: {
    createVideo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllVideo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getVideoById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateVideo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteVideo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateVideoStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=video.controller.d.ts.map