import createFeedService from "../services/createFeedService";
import Feed from "../schemas/feed";
class FeedController {
  async addFeed(req, res) {
    const { feedName, url, originalURL } = req.body;
    const newFeed = await createFeedService({ feedName, url, originalURL });
    return res.json(newFeed);
  }

  async index(req, res) {
    const feeds = await Feed.find({});
    return res.json({ feeds });
  }
}

export default FeedController;
