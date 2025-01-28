import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body;
  try {
    const result = await UserServices.createUserIntoDb(userData);
    res.status(200).json({
      success: true,
      message: "User create succskjdskfndsk",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
};
