import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id);
  console.log(user)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  // if (isUserExists?.isBlocked) {
  //   throw new AppError(StatusCodes.FORBIDDEN, "The user is blocked!");
  // };

  if (!(await User.isPasswordMatched(payload?.id, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match!");
  }

  // console.log(user);

  return {};
};

export const AuthServices = {
  loginUser,
};
