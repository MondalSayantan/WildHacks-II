import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from "./AuthenticationButton";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();

  return (
    <nav className="w-full bg-white shadow">
      <div className="justify-between mx-auto lg:max-w-7xl items-center flex px-8">
        <div>
          <div className="flex items-center justify-between  py-5">
            <Link to="/" className="flex ">
              <FaPaw color="orange" size="2em" className="mr-3" />
              <h2 className="text-2xl font-bold">Cuddles</h2>
            </Link>
          </div>
        </div>
        <div>
          <ul className="items-center justify-center flex space-x-8 space-y-0 ">
            {isAuthenticated && (
              <>
                <Link to="/">
                  <li>Wall of Cuddles</li>
                </Link>
                <Link to="/provide-help">
                  <li>Provide help</li>
                </Link>
                <Link to="/submit">
                  <li>Find help</li>
                </Link>
                <Link to="/information">
                  <li>Information</li>
                </Link>
                <li className="flex items-center space-x-3">
                  <img
                    class="w-10 h-10 rounded-full"
                    src={user.picture}
                    alt="Profile"
                  />
                  <p>{user.name}</p>
                </li>
              </>
            )}

            <li>
              {!isAuthenticated && <AuthenticationButton state="login" />}
              {isAuthenticated && <AuthenticationButton state="logout" />}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
