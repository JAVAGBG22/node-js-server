const Post = require("../model/post");

// PARAM
// param föra att kunna hitta spepcifikt id när vi
// vill hämta tex en specifik post
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

// GET /api/post/:id
// hämtar en specifik post baserat på is
// behöver lägga till param till den här endpointen
exports.read = async (req, res) => {
  return res.json(req.post);
};

// POST /api/post
// skapar en ny post och sparar i databasen
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

// GET /api/posts
// hämtar alla posts som finns i databasen
exports.listAll = async (req, res) => {
  const allPosts = await Post.find({}).sort({ createdAt: 1 }).exec();
  res.json(allPosts);
};

// PUT /api/post/:id
// uppdaterar en specifik post baserat på id
// använd param med den här routen
exports.update = async (req, res) => {
  const post = req.post;
  post.title = req.body.title;
  post.content = req.body.content;
  post.save((err, data) => {
    if (err) {
      return res.status(400).json({ message: "error" });
    }
    res.json(data);
  });
};

// DELETE /api/post/:id
// tar bort en specifik post baserat på id
// använd param med den här routen
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
