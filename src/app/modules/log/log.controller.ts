import type { Request, Response } from "express";
import httpStatus from "http-status";

import { LogServices } from "./log.service.ts";
import sendResponse from "../../utils/response.ts";
import catchAsync from "../../shared/catchAsync.ts";

const getActionLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await LogServices.getActionLogs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Action logs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getErrorLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await LogServices.getErrorLogs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Error logs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const LogController = {
  getActionLogs,
  getErrorLogs,
};
