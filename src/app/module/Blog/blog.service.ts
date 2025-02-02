import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { Request } from "express";
import { User } from "../User/user.model";

export interface TQueryParams {
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const updateBlogIntoDB = async (req: Request, id: string, payload: TBlog) => {
  const blog = await Blog.findById(id);
  //throwing error if blog not found
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const userId = req.user?._id;
  const authorId = blog.author.toString();

  //throu error if user is unauthorized
  if (authorId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You don't have permission to update this blog"
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlogFromDB = async (req: Request, id: string) => {
  const blog = await Blog.findById(id);

  //Blog not found error throw
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const userId = req.user?._id;
  const authorId = blog.author.toString();

  if (authorId !== userId && req.user?.role !== "admin") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You don't have permission to delete this blog"
    );
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogsFromDB = async (query: TQueryParams) => {
  const { search, filter, sortBy, sortOrder } = query;

  const queryObj: any = {};

  // Search on title or content field
  if (search) {
    queryObj.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  // set filter query to author
  if (filter) {
    queryObj.author = filter;
  }

  // sort on asc or desc
  const sortOptions: any = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    sortOptions["createdAt"] = -1;
  }

  const result = await Blog.find(queryObj)
    .sort(sortOptions)
    .populate("author", "name email")
    .select("-createdAt -updatedAt -isPublished -__v");

  return result;
};

const deleteBlogByAdminFromDB = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const blockUserByAdmin = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  user.isBlocked = true;
  await user.save();

  return user;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
  deleteBlogByAdminFromDB,
  blockUserByAdmin,
};
