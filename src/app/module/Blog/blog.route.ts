import express from "express";
import { BlogController } from "./blog.controller";
const router = express.Router();

router.post("/blogs", BlogController.createBlog);

export const BlogRoutes = router;
