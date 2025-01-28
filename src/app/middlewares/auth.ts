import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import httpStatus from "http-status";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED,"Unauthorized access!")
    }
    next();

  });
};

export default auth;
