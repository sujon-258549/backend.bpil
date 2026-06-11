import type { NextFunction, Request, Response } from "express";
import status from "http-status";
import { pick } from "../../../shared/pick.ts";
import { galleryFilterableFields } from "./gallery.constant.ts";
import catchAsync from "../../shared/catchAsync.ts";
import { GalleryServices } from "./gallery.service.ts";
import sendResponse from "../../utils/response.ts";
import { actorFromReq } from "../../utils/tenant.ts";

const createGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await GalleryServices.createGalleryIntoDB(
      req.body,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.CREATED,
      message: "Gallery created successfully",
      data: result,
    });
  },
);

const getAllGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = pick(req.query, [
      ...galleryFilterableFields,
      "page",
      "limit",
      "sortBy",
      "sortOrder",
    ]);
    const result = await GalleryServices.getAllGallery(
      query,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Gallery retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

const getGalleryById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await GalleryServices.getGalleryById(
      id as string,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Gallery retrieved successfully",
      data: result,
    });
  },
);

const updateGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await GalleryServices.updateGallery(
      id as string,
      req.body,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Gallery updated successfully",
      data: result,
    });
  },
);

const deleteGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await GalleryServices.deleteGallery(
      id as string,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Gallery deleted successfully",
      data: result,
    });
  },
);

const updateGalleryStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await GalleryServices.updateGalleryStatus(
      id as string,
      actorFromReq(req),
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Gallery status updated successfully",
      data: result,
    });
  },
);

export const GalleryController = {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
  updateGalleryStatus,
};
