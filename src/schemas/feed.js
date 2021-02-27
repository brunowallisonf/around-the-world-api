import mongoose from "mongoose";

const feedSchema = mongoose.Schema({
  feedName: { type: String, required: true },
  url: {
    type: String,
    required: true,
  },
  originalURL: { type: String, required: false },
});

export default mongoose.model("feeds", feedSchema);
