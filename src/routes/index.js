import { Router } from "express";
import postsRouter from "./postsRouter";
import feedRouter from "./feedRouter";
const routes = Router();

routes.use("/posts", postsRouter);
routes.use("/feeds", feedRouter);

export default routes;
