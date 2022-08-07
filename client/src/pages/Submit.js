import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";
import { endpoint } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import pic from "../assets/pic.jpg";

export const Submit = () => {
  const { user } = useAuth0();
  const storage = getStorage(app);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [imageurl, setImageurl] = useState(null);
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const userName = user.name;
  const userEmail = user.email;
  const userPicture = user.picture;

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

  const postData = {
    body: body,
    userName: userName,
    userEmail: userEmail,
    userPicture: userPicture || "",
    imageurl: imageurl,
    category: category,
    title: title,
    location: location,
  };

  const handleTextChange = (e) => {
    if (e.target.name === "body") {
      setBody(e.target.value);
    }
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "location") {
      setLocation(e.target.value);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    if (imageurl) sendData();
  }, [imageurl]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (title.length === 0) {
      enqueueSnackbar("Title is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    if (category.length === 0) {
      enqueueSnackbar("Category is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    if (body.length === 0) {
      enqueueSnackbar("Body is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    if (location.length === 0) {
      enqueueSnackbar("Location is required", { variant: "warning" });
      setIsLoading(false);
      return;
    }
    const file = document.getElementById("image").files[0];
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
      const res = await axios.post(`${endpoint}/api/help`, postData);
      if (res.status === 201) {
        enqueueSnackbar("Submitted successfully", { variant: "success" });
        navigate("/provide-help");
        setIsLoading(false);
      } else {
        enqueueSnackbar("Error creating post", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">
              Ask for help in the community!
            </h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="name"
                  >
                    Your name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder={user.name}
                    disabled
                  />
                </div>
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="email"
                  >
                    Your email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder={user.email}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="title"
                >
                  Title
                </label>
                <textarea
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="title"
                  type="title"
                  name="title"
                  placeholder="Help me out!"
                  onChange={handleTextChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="body"
                >
                  Describe the problem
                </label>
                <textarea
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="body"
                  type="body"
                  name="body"
                  placeholder="Help me out!"
                  onChange={handleTextChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="location"
                >
                  Enter your location
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  name="location"
                  placeholder="New Delhi"
                  onChange={handleTextChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap">
                  {" "}
                  {categories.map((category) => {
                    return (
                      <div key={category} className="mr-3">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          id={category}
                          onChange={handleCategoryChange}
                        />
                        <label className="ml-2">{category}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="image"
                  >
                    Add one supporting image
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none "
                    aria-describedby="user_avatar_help"
                    id="image"
                    name="image"
                    accept="image/*"
                    type="file"
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                {isLoading ? (
                  <CircularProgress color="success" />
                ) : (
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className=" h-auto bg-gray-400  block w-5/12 bg-cover rounded-l-lg pppp"></div>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Submit, {
  onRedirecting: () => <CircularProgress color="success" />,
});
