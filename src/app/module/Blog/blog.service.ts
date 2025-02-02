// import httpStatus from "http-status";
// import AppError from "../../error/AppError";
// import { TBlog } from "./blog.interface";
// import { Blog } from "./blog.model";
// import { query, Request } from "express";

// type TQueryParams = {
//   search?: string;
//   filter?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// };
// const createBlogIntoDB = async (payload: TBlog) => {
//   const result = await Blog.create(payload);
//   return result;
// };
// const updateBlogIntoDB = async (req: Request, id: string, payload: TBlog) => {
//   const blog = await Blog.findById(id);
//   if (!blog) {
//     throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
//   }
//   const userId = req?.user?._id;
//   const authorId = (blog?.author).toString();
//   if (authorId !== userId) {
//     throw new AppError(
//       httpStatus.FORBIDDEN,
//       "You dont have permission to delete this blog"
//     );
//   }
//   const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
//   return result;
// };

// const deleteBlogFromDB = async (req: Request, id: string) => {
//   const blog = await Blog.findById(id);
//   if (!blog) {
//     throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
//   }
//   const userId = req?.user?._id;
//   const authorId = (blog?.author).toString();

//   if (authorId !== userId) {
//     throw new AppError(
//       httpStatus.FORBIDDEN,
//       "You dont have permission to delete this blog"
//     );
//   }
//   const result = await Blog.findByIdAndDelete(id);
//   return result;
// };

// const getAllBlogsFromDB = async (query: TQueryParams) => {
//   const queryObj = { ...query };
//   console.log(queryObj,'queryobj')
//   let search = "";
//   //if search given then setting here
//   if (query?.search) {
//     search = query?.search;
//   }

//   const blogSearchableFields = ["title", "content"];
//   // if (query?.filter) {
//   //   query._id = query.filter; 
//   // }

//   const searchQuery = Blog.find(
//     {
//       $or: blogSearchableFields.map((field) => ({
//         [field]: { $regex: search, $options: "i" },
//       })),
//     },
//     { createdAt: 0, updatedAt: 0, isPublished: 0, __v: 0 }
//   );
//   //filtering
//   const excludeFields = ["search", "sortBy", "title", "sortOrder"];
//   excludeFields.forEach((element) => delete queryObj[element]);

//   // const filterQuery = searchQuery.find(queryObj).populate("author");

//   let sortBy = "createdAt";

//   if (query?.sortOrder === "asc") {
//     sortBy = query?.sortOrder;
//     console.log("asc", sortBy);
//   }
//   if (query?.sortOrder === "desc") {
//     sortBy = query?.sortOrder;
//     console.log("desc", sortBy);
//   }

//   const sortQuery = await searchQuery
//     .sort(sortBy)
//     .populate("author", "name email");

//   return sortQuery;
// };

// export const BlogService = {
//   createBlogIntoDB,
//   updateBlogIntoDB,
//   deleteBlogFromDB,
//   getAllBlogsFromDB,
// };

//!SECTION this section from deepseek


import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { Request } from "express";
import { User } from "../User/user.model";
// import { User } from "../user";
// import { TQueryParams } from "./blog.interface";

export interface TQueryParams {
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createBlogIntoDB = async (payload: TBlog) => {
  // const user = await User.findById(userId);
  // if (!user || user.isBlocked) {
  //   throw new AppError(httpStatus.FORBIDDEN, "User is blocked or does not exist");
  // }

  // const blogData = { ...payload, author: userId };
  const result = await Blog.create(payload);
  return result;
};

const updateBlogIntoDB = async (req: Request, id: string, payload: TBlog) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const userId = req.user?._id;
  const authorId = blog.author.toString();

  if (authorId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You don't have permission to update this blog");
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlogFromDB = async (req: Request, id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const userId = req.user?._id;
  const authorId = blog.author.toString();

  if (authorId !== userId && req.user?.role !== "admin") {
    throw new AppError(httpStatus.FORBIDDEN, "You don't have permission to delete this blog");
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogsFromDB = async (query: TQueryParams) => {
  const { search, filter, sortBy, sortOrder } = query;

  const queryObj: any = {};

  // Search functionality
  if (search) {
    queryObj.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  // Filter functionality
  if (filter) {
    queryObj.author = filter;
  }

  // Sorting functionality
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
