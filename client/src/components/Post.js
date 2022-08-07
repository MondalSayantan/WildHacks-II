import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useSnackbar } from "notistack";
import { endpoint } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsImageFill } from "react-icons/bs";

const Post = () => {
  const { user } = useAuth0();
  const storage = getStorage(app);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [imageurl, setImageurl] = useState(null);
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const userName = user.name;
  const userEmail = user.email;
  const userPicture = user.picture;

  const postData = {
    heading: heading,
    body: body,
    userName: userName,
    userEmail: userEmail,
    userPicture: userPicture || "",
    imageurl: imageurl,
  };

  useEffect(() => {
    if (imageurl) sendData();
  }, [imageurl]);

  const handleSendClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (heading.length === 0) {
      enqueueSnackbar("Heading is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    if (body.length === 0) {
      enqueueSnackbar("Body is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    const file = document.getElementById("upload").files[0];
    if (!file) {
      enqueueSnackbar("Image is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    if (file) {
      const storageRef = ref(storage, `${user.email}/${file.name}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(ref(storage, `${user.email}/${file.name}`)).then((url) =>
          setImageurl(url)
        );
      });
    }
  };

  const sendData = async () => {
    try {
      const res = await axios.post(`${endpoint}/api/post`, postData);
      if (res.status === 201) {
        enqueueSnackbar("Post created successfully", { variant: "success" });
        window.location.reload();
        setIsLoading(false);
      } else {
        enqueueSnackbar("Error creating post", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImageClick = (e) => {
    e.preventDefault();
    document.getElementById("upload").click();
  };

  const handleUploadClick = async (e) => {
    const file = document.getElementById("upload").files[0];
    const button = document.getElementById("upload-button");
    button.innerHTML = file.name;
  };

  const handleTextAreaChange = (e) => {
    if (e.target.name === "heading") {
      setHeading(e.target.value);
    }
    if (e.target.name === "body") {
      setBody(e.target.value);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <form className="w-full">
      <label for="chat" className="sr-only">
        Post
      </label>
      <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg ">
        <textarea
          id="heading"
          name="heading"
          rows="1"
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Heading..."
          onChange={handleTextAreaChange}
        ></textarea>

        <input
          type="file"
          className="hidden"
          accept="image/*"
          id="upload"
          onChange={handleUploadClick}
        ></input>
        <button
          type="button"
          className="inline-flex justify-center p-2 mr-5 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
          onClick={handleUploadImageClick}
          id="upload-button"
        >
          <BsImageFill color="blue" size={27} />
          <span className="sr-only">Upload image</span>
        </button>
        <img
          class="w-10 h-10 rounded-full mr-3"
          src={user.picture}
          alt="avatar"
        ></img>
      </div>
      <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg ">
        <textarea
          id="body"
          name="body"
          rows="1"
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Your message..."
          onChange={handleTextAreaChange}
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
          onClick={handleSendClick}
        >
          <RiSendPlaneFill color="blue" size={30} />
          <span className="sr-only">Add Post</span>
        </button>
      </div>
    </form>
  );
};

export default Post;
