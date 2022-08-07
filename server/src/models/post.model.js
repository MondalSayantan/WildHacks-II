const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPicture: {
      type: String,
    },
    heading: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports.Post = mongoose.model("Posts", postSchema);
