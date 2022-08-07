const express = require("express");
const { Help } = require("../models");
const { Comment } = require("../models");
// const postController = require("../controllers/post.controller");

const router = express.Router();

router.post("/", async (req, res) => {
  const comment = new Comment({
    userName: req.body.name,
    userEmail: req.body.email,
    userPicture: req.body.picture,
    comment: req.body.comment,
  });
  await comment.save();
  await Help.findByIdAndUpdate(
    { _id: req.body._id },
    { $push: { comment: comment } }
  );
  // await Help.findOneAndUpdate({_id:req.body._id}, {$push: {comment});
  res.sendStatus(201);
});

router.get("/:id", async (req, res) => {
  //console log the array of comments from the help model
  const comments = await Help.findById(req.params.id)
    .sort({ _id: -1 })
    .populate("comment");
  res.status(200).send(comments);
});

module.exports = router;
