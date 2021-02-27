import feed from "../schemas/feed";
import Feed from "../schemas/feed";

export default async function functionCreateFeed({
  feedName,
  url,
  originalURL,
}) {
  const feedExists = await Feed.findOne({ feedName, url });
  if (feedExists) {
    throw new Error("Feed already exists");
  }
  return await Feed.create({ feedName, url, originalURL });
}
