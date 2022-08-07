import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpoint } from "../App";
import moment from "moment";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getComments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${endpoint}/api/comment/${postId}`);
      setComments(res.data.comment);
      console.log(res.data.comment);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Running");
    getComments();
  }, []);
  return (
    <div className="p-5">
      {comments.map((comment) => {
        return (
          <div className="border mt-5">
            <div key={comment.id} className="flex flex-col w-full p-5">
              <div className="flex flex-row justify-between">
                <div className="flex justify-center items-center">
                  <img
                    src={comment.userPicture}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <h6 className="font-semibold">{comment.userName}</h6>
                </div>
                <p className="text-sm">{moment(comment.createdAt).fromNow()}</p>
              </div>
              <div className="mt-3 ml-10 ">
                <pre>{comment.comment}</pre>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
