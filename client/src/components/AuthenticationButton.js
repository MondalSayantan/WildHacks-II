import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const AuthenticationButton = ({ state }) => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  const handleLogin = async () => {
    //redirect to /home after login
    await loginWithRedirect({
      redirect_uri: "http://localhost:3000/home",
      // appState: { targetUrl: "/home" },
    });
  };

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  if (state === "login") {
    return (
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded"
        onClick={handleLogin}
      >
        Log In
      </button>
    );
  } else if (state === "logout") {
    return (
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded"
        onClick={handleLogout}
      >
        Log Out
      </button>
    );
  } else if (state === "getStarted") {
    return (
      <button
        className="rounded-lg px-4 py-2 border-2 h-20 w-52 text-white font-bold bg-orange-400  hover:bg-blue-600 hover:text-blue-100 duration-300"
        onClick={handleLogin}
      >
        Get Started
      </button>
    );
  }
};

export default AuthenticationButton;
