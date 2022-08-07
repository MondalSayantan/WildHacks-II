const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
};
