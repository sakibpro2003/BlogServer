import express from "express";
import { BlogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router = express.Router();

router.post("/", BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id",auth(USER_ROLE.USER) ,BlogController.deleteBlog);
router.get("/",auth(USER_ROLE.ADMIN), BlogController.getAllBlogs);

export const BlogRoutes = router;
