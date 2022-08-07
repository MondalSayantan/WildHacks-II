const { Post } = require("../models");

const addPost = async (post) => {
  const postData = {
    userName: post.userName,
    userEmail: post.userEmail,
    userPicture: post.userPicture,
    heading: post.heading,
    body: post.body,
    mainImage: post.imageurl,
  };
  const newPost = await Post.create(postData);
  return newPost;
};

const getAllPosts = async () => {
  const posts = await Post.find({}).sort({ _id: -1 }).exec();
  return posts;
};

module.exports = {
  addPost,
  getAllPosts,
};
