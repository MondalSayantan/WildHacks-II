import React, { useState } from "react";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";
import { endpoint } from "../App";
import axios from "axios";

const SendEmail = ({ title, postId, toEmail }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth0();

  const data = {
    toEmail: toEmail,
    message: message,
    from: user.name,
    fromEmail: user.email,
    title: title,
  };

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (message.length === 0) {
      enqueueSnackbar("Message is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(`${endpoint}/api/email`, data);
      if (res.status === 200) {
        enqueueSnackbar("Message Sent Successfully", { variant: "success" });
        setIsLoading(false);
        localStorage.setItem(postId + `${user.email}`, "true");
      } else {
        enqueueSnackbar("Error creating comment", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (localStorage.getItem(postId + `${user.email}`) === "true") {
    return (
      <div
        class="flex mx-auto items-center justify-center shadow-lg  w-full"
        id="email"
      >
        <div class="w-full bg-white rounded-lg px-4 p-2 text-center">
          Email Is Limited to once per post
        </div>
      </div>
    );
  }

  return (
    <div
      class="flex mx-auto items-center justify-center shadow-lg w-full"
      id="email"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form class="w-full bg-white rounded-lg px-4 pt-2">
          <div class="flex flex-wrap mx-3 mb-6">
            <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg font-semibold">
              Send Email
            </h2>
            <div class="w-full px-3 mb-2 mt-2">
              <textarea
                class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="email"
                placeholder="Type Your Message"
                required
                onChange={handleTextChange}
              ></textarea>
            </div>
            <div class="w-full flex items-start  px-3">
              <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
              <div class="mr-1">
                <input
                  type="submit"
                  class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="Send Email"
                  id="submit"
                  onClick={handleSubmitClick}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SendEmail;
