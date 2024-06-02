const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const mailService = process.env.MAIL_SERVICE;
  const mailUser = process.env.APP_MAIL;
  const mailPass = process.env.MAIL_PASS;

  if (!mailService || !mailUser || !mailPass) {
    return res.status(500).send("Mail service is not properly configured.");
  }

  const token = crypto.randomBytes(20).toString("hex");

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send("No user found with that email address");
  }

  const result = await User.updateOne(
    { email: req.body.email },
    {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 1800000,
    }
  );

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
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process within 30 minutes of receiving it:\n\n
           http://localhost:5173/retrievePassword/${token}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
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
