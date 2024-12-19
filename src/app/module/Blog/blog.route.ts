import express from "express";
import { BlogController } from "./blog.controller";
const router = express.Router();

router.post("/", BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);
router.get("/", BlogController.getAllBlogs);

export const BlogRoutes = router;
