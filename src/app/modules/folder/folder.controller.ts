import type { Request, Response } from "express";
import { FolderServices } from "./folder.services.ts";
import sendResponse from "../../utils/response.js";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync.js";
import { pick } from "../../../shared/pick.ts";
import { folderFilterableFields } from "./folder.const.ts";
import { actorFromReq } from "../../utils/tenant.ts";

const createFolder = catchAsync(async (req: Request, res: Response) => {
  const result = await FolderServices.createFolder(req.body, actorFromReq(req));
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Folder created successfully",
    data: result,
  });
});

const getAllFolders = catchAsync(async (req: Request, res: Response) => {
  const query = pick(req.query, folderFilterableFields);
  const result = await FolderServices.getAllFolders(query, actorFromReq(req));
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Folders retrieved successfully",
    data: result.data,
  });
});

const getFolderById = catchAsync(async (req: Request, res: Response) => {
  const result = await FolderServices.getFolderById(
    req.params.id as string,
    actorFromReq(req),
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Folder retrieved successfully",
    data: result,
  });
});

const updateFolder = catchAsync(async (req: Request, res: Response) => {
  const result = await FolderServices.updateFolder(
    req.params.id as string,
    req.body,
    actorFromReq(req),
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Folder updated successfully",
    data: result,
  });
});

const deleteFolder = catchAsync(async (req: Request, res: Response) => {
  const result = await FolderServices.deleteFolder(
    req.params.id as string,
    actorFromReq(req),
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Folder deleted successfully",
    data: result,
  });
});

const uploadFile = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new Error("No file uploaded");
  }
  
  const result = await FolderServices.uploadFile(
    req.file,
    req.body.folderId as string | undefined,
    actorFromReq(req)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "File uploaded successfully",
    data: result,
  });
});

const getImageProxy = catchAsync(async (req: Request, res: Response) => {
  const result = await FolderServices.getImageProxy(req.params.id as string);
  if (result.url) {
    res.redirect(result.url);
  } else {
    res.status(404).send("Image not found");
  }
});

const updateImage = catchAsync(async (req: Request, res: Response) => {
  const result = await FolderServices.updateImage(
    req.params.id as string,
    req.body,
    actorFromReq(req),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image renamed successfully",
    data: result,
  });
});

const deleteImage = catchAsync(async (req: Request, res: Response) => {
  const result = await FolderServices.deleteImage(
    req.params.id as string,
    actorFromReq(req),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image deleted successfully",
    data: result,
  });
});

export const FolderController = {
  createFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
  deleteFolder,
  uploadFile,
  getImageProxy,
  updateImage,
  deleteImage,
};
