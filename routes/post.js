const express = require("express");
const router = express.Router();

// controllers
const {
  create,
  listAll,
  read,
  postById,
  update,
  remove,
} = require("../controllers/post");

// create post
router.post("/post", create);

// get all posts
router.get("/posts", listAll);

// get single post
router.get("/post/:postId", read);

// update post
router.put("/post/:postId", update);

// remove post
router.delete("/post/:postId", remove);

// param för att hitta id för specifik post
// används som en parameter i våra routes som kräver ett unikt id
router.param("postId", postById);

module.exports = router;
