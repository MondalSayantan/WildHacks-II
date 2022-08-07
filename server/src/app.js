const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config");
const routes = require("./routes");
const helmet = require("helmet");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(cors());
app.options("*", cors());

app.use("/api", routes);

app.use((req, res, next) => {
  next(httpStatus.NOT_FOUND, "Not Found");
});

module.exports = app;
