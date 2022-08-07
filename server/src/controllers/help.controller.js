const { helpService } = require("../services");

const addHelp = async (req, res) => {
  console.log("Request received for adding help");
  const post = await helpService.addHelp(req.body);
  //send created
  return res.status(201).json(post);
};

const getAllHelp = async (req, res) => {
  console.log("Request received for getting help data");
  const posts = await helpService.getAllHelp(req.params.category);
  return res.status(200).json(posts);
};

const getHelpById = async (req, res) => {
  console.log("Request received for getting help data by id");
  const post = await helpService.getHelpById(req.params.id);
  return res.status(200).json(post);
};

module.exports = {
  addHelp,
  getAllHelp,
  getHelpById,
};
