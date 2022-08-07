const { postService } = require("../services");

const addPost = async (req, res) => {
  console.log("Request received for adding post");
  const post = await postService.addPost(req.body);
  //send created
  return res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
  console.log("Request received for getting all posts");
  const posts = await postService.getAllPosts();
  return res.status(200).json(posts);
};

module.exports = {
  addPost,
  getAllPosts,
};
