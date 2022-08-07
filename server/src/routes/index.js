const express = require("express");
const postRoute = require("./post.route");
const helpRoute = require("./help.route");
const commentRoute = require("./comment.route");
const emailRoute = require("./email.route");

const router = express.Router();

router.use("/post", postRoute);
router.use("/help", helpRoute);
router.use("/comment", commentRoute);
router.use("/email", emailRoute);

module.exports = router;
