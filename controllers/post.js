const { rawListeners } = require("../model/post");
const Post = require("../model/post");

exports.postById = (req, res, next, id) => {
  Post.findById(id).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        message: "Post does not exist",
      });
    }
    req.post = post;
    next();
  });
};

exports.read = async (req, res) => {
  return res.json(req.post);
};

exports.create = async (req, res) => {
  try {
    const post = await new Post({
      title: req.body.title,
      postedBy: req.body.postedBy,
      ...req.body,
    }).save();
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Post creation failed");
  }
};

exports.listAll = async (req, res) => {
  const allPosts = await Post.find({}).sort({ createdAt: 1 }).exec();
  res.json(allPosts);
};

exports.update = async (req, res) => {
  const post = req.post;
  post.save((err, data) => {
    if (err) {
      return res.status(400).json({ message: "error" });
    }
    res.json(data);
  });
};

exports.remove = async (req, res) => {
  const post = req.post;
  post.remove((err, data) => {
    if (err) {
      return res.status(400).json({ message: "error" });
    }
    res.json({
      message: "Post deleted",
    });
  });
};
