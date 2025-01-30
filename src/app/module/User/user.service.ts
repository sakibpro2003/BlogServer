import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "../Blog/blog.service";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Request, Response } from "express";
import { Blog } from "../Blog/blog.model";

const createUserIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

export const UserServices = {
  createUserIntoDb,
};
