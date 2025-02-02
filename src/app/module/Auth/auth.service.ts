import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.email);
  const _id = (user?._id).toString();
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  if (user?.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, "The user is blocked!");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");

  const jwtPayload = {
    _id: user?._id,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });


  return {
    token
  };
};

export const AuthServices = {
  loginUser,
};
