import Feed from "../schemas/feed";
import Post from "../schemas/post";
import Parser from "rss-parser";
import { processTwitterPost } from "./utils/twitter";
import { getFeaturedImage } from "./utils/site";

const parser = new Parser({
  headers: { "User-Agent": "AroundTheWorld" },
});
const TWITTER_URL = "twitter.com";

class PostsRetriever {
  async run() {
    const feeds = await Feed.find({});
    feeds.forEach((feed) => this.processFeed(feed));
  }
  async processFeed(feed) {
    const parsedFeed = await parser.parseURL(feed.url);
    const parsedItems = (
      await Promise.all(parsedFeed.items.map(this.processFeedItem))
    ).filter(
      (post) => !!post && !post.media[0].isVideo && !post.media[0].isGif
    );

    parsedItems.map(async (item) => {
      const postExists = await Post.findOne({ link: item.link });
      if (postExists) {
        console.warn("[SYNC] ignoring posts already exists");
        return;
      }
      await Post.create(item);
    });
  }

  async processFeedItem(item) {
    try {
      const postBasicInformation = {
        title: item.title,
        link: item.link,
        date: new Date(item.isoDate),
        author: item.creator,
        media: [
          {
            mediaUrl: await getFeaturedImage(item),
            isVideo: false,
          },
        ],
        postType: "twitter",
      };

      if (postBasicInformation.link.includes(TWITTER_URL)) {
        const twitterApiInfo = await processTwitterPost(postBasicInformation);
        return {
          ...postBasicInformation,
          ...twitterApiInfo,
          postType: "twitter",
        };
      }

      return postBasicInformation;
    } catch (error) {
      return null;
    }
  }
}

export default new PostsRetriever();
