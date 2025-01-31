import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { query, Request } from "express";

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
  const queryObj = { ...query };
  let search = "";
  if (query?.search) {
    search = query?.search;
  }

  const blogSearchableFields = ["title", "content"];

  const searchQuery = Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    })),
  });
  //filtering
  const excludeFields = ["search"];
  excludeFields.forEach((element) => delete queryObj[element]);

  // const excludeFields = ["searchTerm", "sort"];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // console.log(query, "from service");
  // console.log(query,queryObj,"query")
  const result = await searchQuery.find(queryObj).populate("author");
  console.log(result);
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};

// import httpStatus from "http-status";
// import AppError from "../../error/AppError";
// import { TBlog } from "./blog.interface";
// import { Blog } from "./blog.model";
// import { Request } from "express";

// // const blogSearchableFields = ["title", "content"];

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
//       "You don't have permission to update this blog"
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
//       "You don't have permission to delete this blog"
//     );
//   }
//   const result = await Blog.findByIdAndDelete(id);
//   return result;
// };

// const getAllBlogsFromDB = async (query) => {
//   console.log('base query',query);
//   const queryObj = { ...query };
//   const searchTerm = query?.search || "";
// const blogSearchableFields = ["title", "content"];

//   // Exclude unwanted fields before using queryObj
//   const excludeFields = ["search"];
//   excludeFields.forEach((el) => delete queryObj[el]);

//   // Search query using regex on title and content
//   const searchQuery = searchTerm
//     ? {
//         $or: blogSearchableFields.map((field) => ({
//           [field]: { $regex: searchTerm, $options: "i" },
//         })),
//       }
//     : {}; // If no search term, don't apply regex filtering

//   console.log(query, "from service");

//   // Apply filtering and search
//   const result = await Blog.find({ ...searchQuery, ...queryObj }).populate(
//     "author"
//   );

//   console.log(result);
//   return result;
// };

// export const BlogService = {
//   createBlogIntoDB,
//   updateBlogIntoDB,
//   deleteBlogFromDB,
//   getAllBlogsFromDB,
// };
