import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpoint } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";

const AddComment = ({ postId }) => {
  const { user } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const name = user.name;
  const email = user.email;
  const picture = user.picture;

  const commentData = {
    _id: postId,
    name: name,
    email: email,
    picture: picture || "",
    comment: comment,
  };

  const handleTextChange = (e) => {
    if (e.target.name === "comment") {
      setComment(e.target.value);
    }
  };

  if (isLoading) {
    document.getElementById("submit").innerHTML = "Loading...";
  }

  const handleSubmitClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (comment.length === 0) {
      enqueueSnackbar("Comment is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(`${endpoint}/api/comment`, commentData);
      if (res.status === 201) {
        enqueueSnackbar("Submitted successfully", { variant: "success" });
        setIsLoading(false);
        window.location.reload();
      } else {
        enqueueSnackbar("Error creating comment", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg w-full">
      <form className="w-full  bg-white rounded px-4 pt-2">
        <div className="flex flex-wrap mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg font-semibold">
            Add a new comment
          </h2>
          <div className="w-full  px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="comment"
              placeholder="Type Your Comment"
              required
              onChange={handleTextChange}
            ></textarea>
          </div>
          <div className="w-full  flex items-start  px-3">
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
            <div className="mr-1">
              <input
                type="submit"
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Post Comment"
                id="submit"
                onClick={handleSubmitClick}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
