import { Router } from "express";
import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { User } from './user.model';
const router = express.Router();

router.post("/create-user", UserController.createUser);
export const UserRoutes = router;