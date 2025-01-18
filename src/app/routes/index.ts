import { Router } from "express";
import { BlogRoutes } from "../module/Blog/blog.route";
import { AuthRoutes } from "../module/Auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
