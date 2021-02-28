import Post from "../schemas/post";

class PostController {
  async index(req, res) {
    const { page } = req.query;
    const intPage = parseInt(page, 10);
    const offset = (intPage - 1) * 10;

    const posts = await Post.find({}).sort({ date: -1 }).limit(10).skip(offset);

    return res.json({ posts });
  }
}

export default PostController;
