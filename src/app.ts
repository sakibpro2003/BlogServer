import express, { Request, Response } from "express";
// import { BlogRoutes } from "./app/module/Blog/blog.route";
import router from "./app/routes";

const app = express();

app.use(express.json());
//Product related routes
app.use("/api", router);

//Order related routes
// app.use("/api/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "server running from",
  });
});
export default app;
