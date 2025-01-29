import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Blog } from "../Blog/blog.model";
import { User } from "../User/user.model";

type TBlockPayload = {
  isBlocked: boolean;
};

const blockUserIntoDB = async (id: string, payload: TBlockPayload) => {
  try {
    // Find user by the `id` field (string) instead of `_id`
    const result = await User.findOneAndUpdate({ id }, payload);
    if (!result) {
      throw new Error("User not found");
    }
    return result;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

const deleteBlogFromDB = async (userId: string) => {
  // console.log('userId from service',userId)
  const result = await Blog.findOneAndDelete({ _id:userId });
  // console.log(result,"resutl")
  return result;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
