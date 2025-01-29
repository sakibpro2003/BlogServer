// import { AdminController } from './admin.controller';
import { NextFunction, Request, Response } from "express";
import { User } from "../User/user.model";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import mongoose from "mongoose";

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params; // Extract `userId` from request parameters

    const result = await AdminServices.blockUserIntoDB(userId, req.body);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found or update failed",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User ${result.isBlocked ? "blocked" : "unblocked"} successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  blockUser,
};
