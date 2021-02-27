import { Router } from "express";
const feedRouter = Router();
import FeedController from "../controllers/FeedController";
const feedController = new FeedController();
feedRouter.post("/", feedController.addFeed);
feedRouter.get("/", feedController.index);
export default feedRouter;
