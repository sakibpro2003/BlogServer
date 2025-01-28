import express from "express";
import { BlogController } from "./blog.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/", BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);
router.get("/",auth(), BlogController.getAllBlogs);

export const BlogRoutes = router;
