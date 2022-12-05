const express = require("express");
const router = express.Router();

// controllers
const { create, listAll } = require("../controllers/post");

// create post
router.post("/post", create);

// get all posts
router.get("/posts", listAll);

module.exports = router;
