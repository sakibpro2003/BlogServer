import { Router } from "express";
import { BlogRoutes } from "../module/Blog/blog.route";
import { AuthRoutes } from "../module/Auth/auth.route";
import { UserRoutes } from "../module/User/user.route";

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
  {
    path: "/create",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
