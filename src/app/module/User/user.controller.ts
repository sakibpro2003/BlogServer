import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BlogService } from "../Blog/blog.service";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const result = await UserServices.createUserIntoDb(userData);
    const responseData = {
      _id: result?._id,
      name: result?.name,
      email: result?.email,
    };
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: responseData,
    });
  }
);

export const UserController = {
  createUser,
};
