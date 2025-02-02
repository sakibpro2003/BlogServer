import express from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.patch(
  "/users/:userId/block",
  auth(USER_ROLE.ADMIN),
  AdminController.blockUser
);
router.delete(
  "/blogs/:userId",
  auth(USER_ROLE.ADMIN),
  AdminController.deleteBlog
);

export const AdminRoutes = router;
