import { Router } from "express";
import { BlogRoutes } from "../module/Blog/blog.route";
import { AuthRoutes } from "../module/Auth/auth.route";
import { UserRoutes } from "../module/User/user.route";
import { AdminRoutes } from "../module/admin/admin.route";

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
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
