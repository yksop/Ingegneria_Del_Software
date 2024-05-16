const router = require("express").Router();
const User = require("../models/User");
const { validateLogin } = require("../../validation"); // I use {} to extract only the validateLogin property.
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const EXPIRAL_AUTH_TIME = "2 days";

// LOG-IN
router.post("", async (req, res) => {
  try {
    const username_in = req.body.username;
    const password_in = req.body.password;

    validateLogin(username_in, password_in);

    const userToLogin = await User.findOne({ username: username_in });

    if (!userToLogin) {
      return res.status(401).send("Authentication Failed: User not Found");
    }

    // Worst case: PWD do not match
    if (userToLogin.password != password_in) {
      return res.status(401).send("Authentication Failed: Password incorrect");
    }

    // I generate a JWT token to securely transfer encrypted data between client and server. Client could also reuse this token to authenticate subsequent requests to the server.
    const token = jwt.sign(
      { 
        userId: userToLogin._id, 
        isVolunteer: userToLogin.volunteer.isVolunteer, 
        isCertifier: userToLogin.certifier.isCertifier, 
        isOperator118: userToLogin.operator118.isOperator118
      },
      process.env.JWT_SECRET,
      {
        expiresIn: EXPIRAL_AUTH_TIME,
      }
    ); // payload, secret, options

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
