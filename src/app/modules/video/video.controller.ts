import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import { pick } from "../../../shared/pick.ts";
import { videoFilterableFields } from "./video.constant.ts";
import catchAsync from "../../shared/catchAsync.ts";
import { VideoServices } from "./video.service.ts";
import sendResponse from "../../utils/response.ts";
import { actorFromReq } from "../../utils/tenant.ts";

const createVideo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VideoServices.createVideoIntoDB(
      req.body,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Video created successfully",
      data: result,
    });
  },
);

const getAllVideo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = pick(req.query, [
      ...videoFilterableFields,
      "page",
      "limit",
      "sortBy",
      "sortOrder",
    ]);
    const result = await VideoServices.getAllVideo(
      query,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Video retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

const getVideoById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await VideoServices.getVideoById(
      id as string,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Video retrieved successfully",
      data: result,
    });
  },
);

const updateVideo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await VideoServices.updateVideo(
      id as string,
      req.body,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Video updated successfully",
      data: result,
    });
  },
);

const deleteVideo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await VideoServices.deleteVideo(
      id as string,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Video deleted successfully",
      data: result,
    });
  },
);

const updateVideoStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await VideoServices.updateVideoStatus(
      id as string,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Video status updated successfully",
      data: result,
    });
  },
);

export const VideoController = {
  createVideo,
  getAllVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  updateVideoStatus,
};
