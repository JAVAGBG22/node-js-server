const Post = require("../model/post");

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
