import { Router } from "express";
const postsRouter = Router();
import PostController from "../controllers/PostController";
const postController = new PostController();
postsRouter.get("/", postController.index);

export default postsRouter;
