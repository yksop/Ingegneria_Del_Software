const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
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

router.post("/", async (req, res) => {});

module.exports = router; // Export the router
