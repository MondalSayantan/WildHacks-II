const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: "this field is required",
    },
    userEmail: {
      type: String,
      required: "this field is required",
    },
    userPicture: {
      type: String,
    },
    comment: {
      type: String,
      required: "this filed is required",
    },
    help: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
    },
  },
  {
    timestamps: true,
  }
);

module.exports.Comment = mongoose.model("Comment", commentSchema);
