import { Router } from "express";
import postsRouter from "./postsRouter";
import feedRouter from "./feedRouter";
const routes = Router();

routes.use("/posts", postsRouter);
routes.use("/feeds", feedRouter);

routes.get("/", (req, res) => {
  status: "up";
  endpoints: [
    {
      retrievePosts: "GET /posts?page=1",
      addFeed: "POST /feeds",
      retrieveFeeds: "GET /feeds",
    },
  ];
});

export default routes;
