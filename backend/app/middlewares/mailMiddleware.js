const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", (req, res) => {
  const mailService = process.env.MAIL_SERVICE;
  const mailUser = process.env.APP_MAIL;
  const mailPass = process.env.MAIL_PASS;

  if (!mailService || !mailUser || !mailPass) {
    return res.status(500).send("Mail service is not properly configured.");
  }

  let transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  let mailOptions = {
    from: mailUser,
    to: req.body.email,
    subject: "Password Reset",
    text: "Here is your password reset link...",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error while sending email:", error);
      res.status(500).send("Error while sending email: " + error.message);
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = router;
