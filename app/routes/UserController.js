const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../../validation");

router.post("", async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const savedEmail = await User.findOne({ email: req.body.email });
  if (savedEmail) return res.status(400).send("Email already exists");

  // Check if username exists
  const savedUsername = await User.findOne({ username: req.body.username });
  if (savedUsername) return res.status(400).send("Username already exists");

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

module.exports = router; // Export the router
