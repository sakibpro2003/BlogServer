import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const updateBlogIntoDB = async (id: string, payload: TBlog) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
