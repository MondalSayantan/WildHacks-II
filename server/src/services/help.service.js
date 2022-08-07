const { Help } = require("../models");

const addHelp = async (help) => {
  const helpData = {
    userName: help.userName,
    userEmail: help.userEmail,
    userPicture: help.userPicture,
    title: help.title,
    category: help.category,
    body: help.body,
    mainImage: help.imageurl,
    location: help.location,
  };
  const newHelp = await Help.create(helpData);
  return newHelp;
};

const getAllHelp = async (category) => {
  if (category === "All") {
    const help = await Help.find({}).sort({ _id: -1 }).exec();
    return help;
  }
  const help = await Help.find({ category: category }).sort({ _id: -1 }).exec();
  return help;
};

const getHelpById = async (id) => {
  const help = await Help.findById(id).exec();
  return help;
};

module.exports = {
  addHelp,
  getAllHelp,
  getHelpById,
};
