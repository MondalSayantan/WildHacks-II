import React from "react";
import Post from "../components/Post";
import Feed from "../components/Feed";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./LandingPage";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="mx-auto flex flex-col w-2/4 ">
      <div className="m-5">
        <h1 className="text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500  text-5xl">
          Wall of Cuddles
        </h1>
      </div>
      {isAuthenticated && (
        <div className=" py-4">
          <Post />
        </div>
      )}
      <div className="   w-4/6 mx-auto mb-5">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
