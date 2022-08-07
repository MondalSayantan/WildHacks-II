import React from "react";
import { FaPaw } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-4 bg-blue-400 text-white shadow px-6  ">
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <FaPaw color="orange" size="2em" className="mr-3" />
          <p className="text-3xl font-bold ">Cuddles</p>
        </div>
        <div>
          <p>Made by Sayantan Mondal for WildHacks 2</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
