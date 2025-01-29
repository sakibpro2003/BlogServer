import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

router.patch("/users/:userId/block", AdminController.blockUser);

export const AdminRoutes = router;
