import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpoint } from "../App";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProvideHelp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState(["hello"]);
  const categories = [
    "All",
    "Adoption",
    "Food",
    "Clothes",
    "Medical",
    "Behaviour",
    "Sponsor",
    "Abuse",
    "Other",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${endpoint}/api/help/sort/${selectedCategory}`
      );
      setPostData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  if (postData.length === 0) {
    return (
      <section className="w-3/4 mx-auto py-4 sm:py-12 bg-white rounded-lg border border-gray-200 shadow-md mt-5 min-h-screen mb-5">
        <div className="container p-6 pt-0 mx-auto space-y-8">
          <div className=" text-center">
            <h2 className="text-3xl font-bold">
              Provide Help to the Community
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {categories.map((category) => {
              return (
                <button
                  className={`${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "border-blue-500"
                  }  font-semibold py-2 px-4 rounded-full mx-2`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className=" text-center">
            <h2 className="text-2xl ">No Posts to Display</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-3/4 mx-auto py-4 sm:py-12 bg-white rounded-lg border border-gray-200 shadow-md mt-5 min-h-screen mb-5">
      <div className="container p-6 pt-0 mx-auto space-y-8">
        <div className=" text-center">
          <h2 className="text-3xl font-bold">Provide Help to the Community</h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {categories.map((category) => {
            return (
              <button
                className={`${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "border-blue-500"
                }  font-semibold py-2 px-4 rounded-full mx-2`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full w-full mt-5">
            <CircularProgress color="success" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3">
            {postData.map((post) => {
              return (
                <Link to={`/provide-help/${post._id}`} key={post._id}>
                  <article className="flex flex-col ">
                    <img
                      alt=""
                      className="object-cover w-full h-52 "
                      src={post.mainImage}
                    />
                    <div className="flex flex-col flex-1 p-6">
                      {post.category}
                      <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                        {post.title}
                      </h3>
                      <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs ">
                        <span>{moment(post.createdAt).fromNow()}</span>
                        <span>{post.userName}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default withAuthenticationRequired(ProvideHelp, {
  onRedirecting: () => <CircularProgress color="success" />,
});
