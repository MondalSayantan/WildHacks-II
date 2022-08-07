import React, { useState, useEffect } from "react";
// get the url and make api call to get the data
import axios from "axios";
import { useParams } from "react-router";
import { endpoint } from "../App";
import AddComment from "../components/AddComment";
import Comments from "../components/Comments";
import SendEmail from "../components/SendEmail";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";

export const HelpPage = () => {
  const { postID } = useParams();

  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPost = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${endpoint}/api/help/${postID}`);
      console.log(res.data);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-center mt-5 bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="mt-5">
          <h1 className="text-3xl font-bold capitalize">{post.title}</h1>
        </div>
        <div>
          <p className="text-xl mt-5">{post.category}</p>
        </div>
        <div className=" flex justify-center items-center mt-1">
          <p className="text-sm mr-3">Posted by {post.userName}</p>
          <img
            src={post.userPicture}
            alt="user"
            className="w-6 h-6 rounded-full mr-2"
          />
        </div>
        <p className="font-bold capitalize">{post.location}</p>
        <div className="mt-5 w-80 ">
          <img
            alt=""
            className="object-cover rounded-lg border shadow-2xl w-full h-full"
            src={post.mainImage}
          />
        </div>
        <div className="mt-5 mb-5">
          <pre className="text-xl">{post.body}</pre>
        </div>
      </div>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-center mt-5 bg-white rounded-lg border border-gray-200 shadow-md">
        <SendEmail
          title={post.title}
          toEmail={post.userEmail}
          postId={postID}
        />
      </div>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-center mt-5 bg-white rounded-lg border border-gray-200 shadow-md">
        <AddComment postId={postID} />
      </div>
      <div className="w-3/4 mx-auto mt-5 bg-white rounded-lg border border-gray-200 shadow-md mb-5">
        <div className="flex justify-center items-center mt-5">
          <h1 className="text-3xl font-bold">Comments</h1>
        </div>
        <Comments postId={postID} />
      </div>
    </>
  );
};

export default withAuthenticationRequired(HelpPage, {
  onRedirecting: () => <CircularProgress color="success" />,
});
