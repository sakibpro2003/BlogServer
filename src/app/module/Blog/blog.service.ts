import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { query, Request } from "express";

type TQueryParams = {
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
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

const getAllBlogsFromDB = async (query: TQueryParams) => {
  const queryObj = { ...query };
  console.log(queryObj,'queryobj')
  let search = "";
  //if search given then setting here
  if (query?.search) {
    search = query?.search;
  }

  const blogSearchableFields = ["title", "content"];
  // if (query?.filter) {
  //   query._id = query.filter; 
  // }

  const searchQuery = Blog.find(
    {
      $or: blogSearchableFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      })),
    },
    { createdAt: 0, updatedAt: 0, isPublished: 0, __v: 0 }
  );
  //filtering
  const excludeFields = ["search", "sortBy", "title", "sortOrder"];
  excludeFields.forEach((element) => delete queryObj[element]);

  // const filterQuery = searchQuery.find(queryObj).populate("author");

  let sortBy = "createdAt";

  if (query?.sortOrder === "asc") {
    sortBy = query?.sortOrder;
    console.log("asc", sortBy);
  }
  if (query?.sortOrder === "desc") {
    sortBy = query?.sortOrder;
    console.log("desc", sortBy);
  }

  const sortQuery = await searchQuery
    .sort(sortBy)
    .populate("author", "name email");

  return sortQuery;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
