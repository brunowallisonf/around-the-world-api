import postsRetriever from "./PostsRetriever";
class Crons {
  constructor() {
    setInterval(() => postsRetriever.run(), 3000);
    setInterval(() => postsRetriever.run(), 15 * 60 * 1000);
  }
}

export default new Crons();
