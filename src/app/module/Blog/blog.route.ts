import express from "express";
import { BlogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.post("/",auth(USER_ROLE.USER), BlogController.createBlog);
router.patch("/:id",auth(USER_ROLE.USER), BlogController.updateBlog);
router.delete("/:id",auth(USER_ROLE.USER,USER_ROLE.ADMIN) ,BlogController.deleteBlog);
router.get("/",BlogController.getAllBlogs);

export const BlogRoutes = router;
