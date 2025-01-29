// import { AdminController } from './admin.controller';
import { NextFunction, Request, Response } from "express";
import { User } from "../User/user.model";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Blog } from "../Blog/blog.model";

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
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  console.log(userId, "controller userid")
  const result = await AdminServices.deleteBlogFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
};

export const AdminController = {
  blockUser,
  deleteBlog,
};
