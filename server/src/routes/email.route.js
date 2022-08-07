const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const config = require("../config");

sgMail.setApiKey(config.sendgrid.apiKey);

router.post("/", async (req, res) => {
  const msg = {
    to: req.body.toEmail,
    from: "wildhacks@sayantanmondal.com",
    subject: `New message for "${req.body.title}"`,
    text: req.body.message,
    html: `<h4>Greeetings from ${req.body.from},</h4> 
           <p>${req.body.message}</p>  
           <p>Regards,</p> <p>${req.body.fromEmail}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("Email sent");
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
});

module.exports = router;
