const express = require("express");
const helpController = require("../controllers/help.controller");

const router = express.Router();

router.post("/", helpController.addHelp);
router.get("/sort/:category", helpController.getAllHelp);
router.get("/:id", helpController.getHelpById);

module.exports = router;
