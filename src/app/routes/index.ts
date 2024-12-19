import { Router } from 'express';
import { BlogRoutes } from '../module/Blog/blog.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: BlogRoutes,
  }
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
