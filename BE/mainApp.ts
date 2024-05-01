import { log } from "console";
import { Application, Request, Response } from "express";
import router from "./router/userRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/", router);

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          msg: "Welcome to the API",
        });
      } catch (error) {
        log(error);
      }
    });
  } catch (error) {
    return error;
  }
};
