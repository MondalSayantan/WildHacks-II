import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { endpoint } from "../App";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const getFeed = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${endpoint}/api/post`);
      await setFeed(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isloading) {
    return <div>Loading Feed...</div>;
  }

  return (
    <div className="w-full ">
      {feed.length > 0 ? (
        feed.map((post) => {
          console.log(post.userPicture);
          return (
            <div className="w-full shadow h-auto bg-white rounded-md mt-4">
              <div className="flex items-center space-x-2 p-2.5 px-4">
                <div className="w-10 h-10">
                  <img
                    src={post.userPicture}
                    className="w-full h-full rounded-full"
                    alt="dp"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <p className="font-semibold text-sm text-gray-700">
                    {post.userName}
                  </p>
                  <span className="text-xs font-thin text-gray-400">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
                <div className="w-8 h-8">
                  <button className="w-full h-full hover:bg-gray-100 rounded-full text-gray-400 focus:outline-none">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
              <div className="mb-1">
                <h2 className="px-3">{post.heading}</h2>
              </div>
              {post.body ? (
                <div className="mb-1">
                  <p className="text-gray-700 max-h-10  px-3 text-sm">
                    {post.body}
                  </p>
                </div>
              ) : null}
              {post.mainImage ? (
                <div className="w-full h-76 max-h-80 p-2  ">
                  <img
                    src={post.mainImage}
                    alt="postimage"
                    className="w-full h-72 max-h-80"
                  />
                </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <div className="h-10">
          <p>No feed found.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
