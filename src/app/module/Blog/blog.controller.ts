import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  req.body.author = req.user._id;
  const result = await BlogService.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await BlogService.getAllBlogsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs fetched successfully",
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.updateBlogIntoDB(req, id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogFromDB(req, id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
