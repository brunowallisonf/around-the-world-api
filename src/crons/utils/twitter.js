import twitter from "../../config/twitter";
import twitterConfig from "../../config/twitter";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const processSingleMedia = (mediaObj) => {
  try {
    if (mediaObj.type === "photo") {
      return {
        hash: uuidv4(),
        mediaUrl: `${mediaObj.media_url_https}:small`,
        isVideo: mediaObj.type === "video",
        width: mediaObj.sizes.small.w,
        height: mediaObj.sizes.small.h,
        isGif: false,
      };
    }

    const mediaUrlObj = mediaObj.video_info.variants
      .filter((variant) => variant.bitrate !== undefined && variant)
      .pop();

    const mediaUrl = mediaUrlObj ? mediaUrlObj.url : undefined;

    if (mediaObj.type === "animated_gif") {
      return {
        hash: uuidv4(),
        videoPicture: mediaObj.media_url_https,
        isVideo: true,
        isGif: true,
        mediaUrl,
        width: mediaObj.sizes.small.w,
        height: mediaObj.sizes.small.h,
      };
    }

    return {
      hash: uuidv4(),
      videoPicture: mediaObj.media_url_https,
      isVideo: mediaObj.type === "video",
      mediaUrl,
      isGif: false,
      width: mediaObj.sizes.small.w,
      height: mediaObj.sizes.small.h,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const getMediaList = (post) => {
  try {
    const media = post.extended_entities
      ? post.extended_entities.media
      : post.entities.media;

    if (!media) return [];

    return media
      .map((mediaObj) => processSingleMedia(mediaObj))
      .filter((it) => !!it);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const retrieveTwitJSON = async ({ link }) => {
  const postId = link.split("/").pop();

  const response = await axios.get(
    `https://api.twitter.com/1.1/statuses/show.json?id=${postId}&tweet_mode=extended`,
    {
      headers: {
        authorization: `Bearer ${twitterConfig.bearerToken}`,
      },
    }
  );

  return response.data;
};

export const processTwitterPost = async (post) => {
  const twitterPost = await retrieveTwitJSON(post);
  const media = getMediaList(twitterPost);
  return {
    date: new Date(twitterPost.created_at),
    author: twitterPost.user.name,
    authorUsername: twitterPost.user.screen_name,
    profilePicture: twitterPost.user.profile_image_url_https,
    media,
  };
};
