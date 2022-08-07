import React from "react";
import AuthenticationButton from "../components/AuthenticationButton";
import { FaPaw, FaCommentMedical, FaHandsHelping } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center flex-col bg-blue-900 text-white py-5 h-screen ppp">
      <div className="flex justify-center items-center">
        <h1 className="font-serif text-5xl text-white font-bold">
          Welcome to Cuddles
        </h1>
        <FaPaw color="orange" size="3em" className="ml-5" />
      </div>
      <div className="mt-5">
        <p className="font-serif text-white text-2xl mb-5 mx-auto">
          This is a community for people to find help with their pets.
        </p>
      </div>
      <div>
        <p className="font-serif text-white text-2xl font-semibold">
          What all can you do?
        </p>
      </div>
      <div className="mt-5 flex flex-row grid-cols-3">
        <div class="p-6 max-w-sm bg-teal-600 rounded-lg border border-gray-200 shadow-md m-5 ">
          <FaCommentMedical color="white" size="3em" />
          <h5 class="mb-2 text-2xl font-semibold tracking-tight  ">
            Need Some Help?
          </h5>
          <p class="mb-3 font-normal  ">
            Maybe you found an animal that needs a home, or maybe just your pet
            is behaving differently. Your help is just one post away!{" "}
          </p>
        </div>
        <div class="p-6 max-w-sm bg-teal-600 rounded-lg border border-gray-200 shadow-md m-5">
          <FaHandsHelping color="white" size="3em" />
          <h5 class="mb-2 text-2xl font-semibold tracking-tight ">
            Help Someone Out
          </h5>
          <p class="mb-3 font-normal  ">
            Looking for a pet to adopt, or have a lot of knowledge about
            animals? Interact with the community or send an email!
          </p>
        </div>
        <div class="p-6 max-w-sm bg-teal-600 rounded-lg border border-gray-200 shadow-md m-5">
          <BsFillPeopleFill color="white" size="3em" />
          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Show Off
          </h5>
          <p class="mb-3 font-normal ">
            Did your dog do a backflip? Did you find a lost pet? Show your
            happiness to the world!
          </p>
        </div>
      </div>
      <div className="mt-5">
        <AuthenticationButton state="getStarted" />
      </div>
    </div>
  );
};

export default LandingPage;
