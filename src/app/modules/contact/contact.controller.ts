import type { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.ts";
import sendResponse from "../../utils/response.ts";
import httpStatus from "http-status";
import { ContactServices } from "./contact.service.ts";

const submitContactForm = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.submitContactForm(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact form submitted successfully",
    data: result,
  });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.getAllContacts(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contacts retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateContactStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.updateContactStatus(req.params.id as string, req.body.status as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact status updated successfully",
    data: result,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.deleteContact(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact deleted successfully",
    data: result,
  });
});

export const ContactController = {
  submitContactForm,
  getAllContacts,
  updateContactStatus,
  deleteContact,
};
