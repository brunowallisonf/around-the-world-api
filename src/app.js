import "dotenv/config";
import("./database");
import express from "express";
import routes from "./routes";
import cors from "cors";
import("./crons");
class App {
  constructor() {
    this.server = express();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  loadMiddlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  loadRoutes() {
    this.server.use(routes);
  }
}

export default new App().server;
