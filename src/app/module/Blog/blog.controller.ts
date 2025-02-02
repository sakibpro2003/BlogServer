import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TBlog } from "./blog.interface";
import { TUser } from "../User/user.interface";


const createBlog = catchAsync(async (req: Request, res: Response) => {
  req.body.author = req.user._id;
  const result = await BlogService.createBlogIntoDB(req.body);
  const authorPopulated = await result.populate({
    path: "author",
    select: "name email",
  });
  const { _id, title, content, author } = result;
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog created successfully",
    data: {
      _id,
      title,
      content,
      author,
    },
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

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Blog not found",
    });
  }

  const authorPopulated = await result.populate({
    path: "author",
    select: "name email",
  });

  const { _id, title, content, author } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: {
      _id,
      title,
      content,
      author,
    },
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogFromDB(req, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
