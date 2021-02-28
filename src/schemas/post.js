import mongoose, { mongo } from "mongoose";

const postSchema = mongoose.Schema({
  feedId: String,

  link: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorUsername: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
  },
  media: {
    type: [Object],
    required: false,
  },
  date: {
    type: Date,
  },
  postType: String,
});

export default mongoose.model("post", postSchema);
