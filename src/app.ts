import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
import mealPlansRouter from "./mealPlans/mealPlans.route";
require("dotenv").config();

const port: number = Number(process.env.PORT) || 3000;

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoutes() {
    this.app.get("/ping", (req, res) => {
      res.send("pong");
    });
    this.app.use("/mealplans", mealPlansRouter);
  }

  private setMiddlewares() {
    this.app.set("port", port);
    this.app.set("trust proxy", true);
    this.app.use(
      morgan(
        ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] :response-time ms :referrer :user-agent"
      )
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        credentials: true,
      })
    );
    this.setRoutes();
    this.app.use(errorHandler);
  }

  private connectDB() {
    const { MONGO_URI } = process.env;
    mongoose
      .connect(MONGO_URI!, {
        useNewUrlParser: true,
      } as any)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public listen() {
    this.connectDB();
    this.setMiddlewares();
    this.app.listen(this.app.get("port"), () => {
      console.log(this.app.get("port"), "번 포트에서 대기중");
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
