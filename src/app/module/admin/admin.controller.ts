import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const result = await AdminServices.blockUserIntoDB(userId);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User blocked successfully`,
    });
  } catch (error) {
    next(error);
  }
};
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const result = await AdminServices.deleteBlogFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
  });
};

export const AdminController = {
  blockUser,
  deleteBlog,
};
