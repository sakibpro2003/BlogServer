import express, { Request, Response } from "express";
import router from "./app/routes";

const app = express();

app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "server running from",
  });
});
export default app;
