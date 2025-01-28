import express from "express";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


declare global {
  namespace express {
    interface Request {
      user: JwtPayload;
    }
  }
}
