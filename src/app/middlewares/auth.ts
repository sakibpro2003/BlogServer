import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

type TRequiredRoles = "user" | "admin";

//NOTE: verifying user or admin
const auth = (...requiredRoles: TRequiredRoles[]) => {
  console.log(requiredRoles, "req roles");
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(" ")[1];
    console.log(req.headers, "tone");

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!");
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!");
        }
        // decoded undefined
        req.user = decoded as JwtPayload & { _id: string };

        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!");
        }
        next();
      }
    );
  });
};

export default auth;
