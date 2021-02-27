import cheerio from "cheerio";

export const getFeaturedImage = async (item) => {
  if (item.enclosure && item.enclosure.url) {
    const url = item.enclosure.url;
    return url.slice(url.indexOf("http"));
  }
  if (
    item.link.includes(twitterURL) ||
    item.link.includes(instagramURL) ||
    item.link.includes(youtubeURL)
  ) {
    return null;
  }
  if (!item.content) {
    return null;
  }

  let articleCont = cheerio.load(item.content);

  const articleImage = articleCont("img")[0];

  if (!articleImage) {
    if (item["content:encoded"]) {
      articleCont = cheerio.load(item["content:encoded"]);
    }
    if (item["media:content"]) {
      articleCont = cheerio.load(item["media:content"]);
    } else {
      return null;
    }
  }
  if (!articleImage) {
    return null;
  }

  const imageUrl = articleImage.attribs.src;
  const imageSet = articleImage.attribs.srcset;

  if (item["media:content"]) {
    articleCont = cheerio.load(item["media:content"]);
    const url = articleCont[0].attribs.url;
    return url;
  }

  let finalUrl = imageUrl;
  if (imageSet && imageSet.length > 0) {
    let parsed = srcset.parse(imageSet);
    let width = 600;

    const filtered = parsed.filter((parseObj) => {
      if (parseObj.width >= width) {
        return true;
      }
      return false;
    });

    finalUrl = filtered[0].url;
  }

  return finalUrl;
};
