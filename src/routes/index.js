import { Router } from "express";
import postsRouter from "./postsRouter";
const routes = Router();

routes.use("/posts", postsRouter);

export default routes;
