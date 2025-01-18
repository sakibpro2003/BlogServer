import express, { Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(express.json());

app.use("/api", router);

//global error handler recieves 4 params
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "server running from",
  });
});
export default app;
