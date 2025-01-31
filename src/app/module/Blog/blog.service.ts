import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { query, Request } from "express";

const blogSearchableFields = ["title", "content"];

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const updateBlogIntoDB = async (req: Request, id: string, payload: TBlog) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  const userId = req?.user?._id;
  const authorId = (blog?.author).toString();
  if (authorId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You dont have permission to delete this blog"
    );
  }
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlogFromDB = async (req: Request, id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  const userId = req?.user?._id;
  const authorId = (blog?.author).toString();

  if (authorId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You dont have permission to delete this blog"
    );
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogsFromDB = async (query) => {
  let searchTerm = " ";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm;
  }

  console.log(query, "from service");
  const result = await Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
