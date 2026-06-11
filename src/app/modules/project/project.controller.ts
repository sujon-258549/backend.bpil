import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync.ts";
import sendResponse from "../../utils/response.ts";
import { ProjectService } from "./project.service.ts";
import { ProjectStatus } from "../../../generated/prisma/index.js";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProject(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    searchTerm: req.query.searchTerm as string,
    isActive: req.query.isActive as string,
    category: req.query.category as string,
    status: req.query.status as ProjectStatus,
  };
  const paginationOptions = {
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
    skip: req.query.page && req.query.limit ? (Number(req.query.page) - 1) * Number(req.query.limit) : 0,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as string,
  };
  const result = await ProjectService.getAllProjects(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getSingleProject(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project fetched successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.updateProject(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.deleteProject(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
