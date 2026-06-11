
import type { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.ts";
import sendResponse from "../../utils/response.ts";
import { TeamMemberService } from "./team-member.service.ts";

const createTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamMemberService.createTeamMember(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team Member created successfully",
    data: result,
  });
});

const getAllTeamMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamMemberService.getAllTeamMembers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team Members retrieved successfully",
    data: result,
  });
});

const getSingleTeamMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamMemberService.getSingleTeamMember(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team Member retrieved successfully",
    data: result,
  });
});

const updateTeamMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamMemberService.updateTeamMember(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team Member updated successfully",
    data: result,
  });
});

const deleteTeamMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamMemberService.deleteTeamMember(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team Member deleted successfully",
    data: result,
  });
});

export const TeamMemberController = {
  createTeamMember,
  getAllTeamMembers,
  getSingleTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
