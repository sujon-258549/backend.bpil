import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync.ts";
import sendResponse from "../../utils/response.ts";
import { DynamicContentService } from "./dynamicContent.service.ts";

const upsertDynamicContent = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await DynamicContentService.upsertDynamicContent(req.body, user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dynamic content updated successfully",
    data: result,
  });
});

const bulkUpsertDynamicContents = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await DynamicContentService.bulkUpsertDynamicContents(req.body, user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bulk dynamic contents updated successfully",
    data: result,
  });
});

const getDynamicContentsByGroup = catchAsync(async (req: Request, res: Response) => {
  const result = await DynamicContentService.getDynamicContentsByGroup(req.params.group as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Group dynamic contents retrieved successfully",
    data: result,
  });
});

const getDynamicContentsMap = catchAsync(async (req: Request, res: Response) => {
  const result = await DynamicContentService.getDynamicContentsMap(req.query.group as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dynamic contents map fetched successfully",
    data: result,
  });
});

const getAllDynamicContents = catchAsync(async (req: Request, res: Response) => {
  const result = await DynamicContentService.getAllDynamicContents(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All dynamic contents retrieved successfully",
    data: result,
  });
});

const deleteDynamicContent = catchAsync(async (req: Request, res: Response) => {
  const result = await DynamicContentService.deleteDynamicContent(req.params.key as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dynamic content deleted successfully",
    data: result,
  });
});

const bulkDeleteDynamicContents = catchAsync(async (req: Request, res: Response) => {
  const result = await DynamicContentService.bulkDeleteDynamicContents(req.body.keys);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bulk dynamic contents deleted successfully",
    data: result,
  });
});

export const DynamicContentController = {
  upsertDynamicContent,
  bulkUpsertDynamicContents,
  getDynamicContentsByGroup,
  getDynamicContentsMap,
  getAllDynamicContents,
  deleteDynamicContent,
  bulkDeleteDynamicContents,
};
