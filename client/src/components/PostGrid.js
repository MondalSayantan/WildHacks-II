import React from "react";
import Post from "./Post";

const PostGrid = () => {
  return (
    <>
      <h1 className="mt-5 mb-8 mx-auto">Latest Posts</h1>
      <div className="grid grid-cols-2">
        <Post />
      </div>
    </>
  );
};

export default PostGrid;
