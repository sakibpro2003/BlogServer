import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id);
  console.log(user);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  if (user?.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, "The user is blocked!");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  const jwtPayload = {
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  // console.log(user);

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
