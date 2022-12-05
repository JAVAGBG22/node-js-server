const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    postedBy: {
      type: String,
      default: "Helena",
    },
  },
  { timestamps: true }
  //createdAt
);

module.exports = mongoose.model("Post", postSchema);
