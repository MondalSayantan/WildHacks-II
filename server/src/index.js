const mongoose = require("mongoose");
const config = require("./config");
const app = require("./app");

let server;

mongoose.connect(config.mongoose.url).then(() => {
  console.log("Connected to MongoDB");
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
});
