import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import { Request, Response } from "express";

const createBlog = async (req: Request, res: Response) => {
  const result = await BlogService.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
};

export const BlogController = {createBlog};
