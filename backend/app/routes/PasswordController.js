const router = require("express").Router();
const User = require("../models/User");
const { resetPasswordValidation } = require("../../validation");

router.get("/:token", async (req, res) => {
  try {
    if (!req) {
      return res.status(400).send("Request is null\n");
    }

    if (!req.params.token) {
      return res.status(400).send("Token is required\n");
    }

    const userWithToken = await User.findOne({
      resetPasswordToken: req.params.token,
    });

    if (!userWithToken) {
      return res.status(400).send("Password reset token is invalid.");
    }

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Password reset token has expired.");
    }

    return res.status(200).json({ token: req.params.token });
  } catch (err) {
    console.log(err);
    return res.status(500).send;
  }
});

router.post("/:token", async (req, res) => {
  try {
    if (!req) {
      return res.status(400).send("Request is null\n");
    }

    if (!req.params.token) {
      return res.status(400).send("Token is required\n");
    }

    const { error } = resetPasswordValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .send("Password reset token is invalid or has expired.");
    }

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: req.body.password,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      }
    );

    return res
      .status(200)
      .json({ message: "Password reset successfully", redirectTo: "/" });
  } catch (err) {
    console.log(err);
    return res.status(500).send;
  }
});

module.exports = router;
