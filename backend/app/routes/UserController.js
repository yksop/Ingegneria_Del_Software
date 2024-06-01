const router = require("express").Router();
const User = require("../models/User");
const { Alert } = require("../models/Alert");
const { registerValidation } = require("../../validation");
const { changeCredentialValidation } = require("../../validation"); // I use {} to extract only the validateLogin property.
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/authMiddleware");
// JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
// JWT is widely useful in scenarios like Authorization and Information Exchange, to encypt and securely transmit information between parties.
// Reference: https://jwt.io/introduction
const jwt = require("jsonwebtoken");
const EXPIRAL_AUTH_TIME = "2 days";

// REGISTRATION
router.post("", async (req, res) => {
  try {
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
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      volunteer: {
        isVolunteer: req.body.volunteer.isVolunteer
          ? req.body.volunteer.isVolunteer
          : false,
        acceptedAlert: req.body.volunteer.acceptedAlert
          ? req.body.volunteer.acceptedAlert
          : undefined,
        certificateCode: req.body.volunteer.certificateCode
          ? req.body.volunteer.certificateCode
          : undefined,
        isAvailable: req.body.volunteer.isAvailable
          ? req.body.volunteer.isAvailable
          : false,
      },
      certifier: {
        isCertifier: req.body.certifier.isCertifier
          ? req.body.certifier.isCertifier
          : false,
      },
      operator118: {
        isOperator118: req.body.operator118.isOperator118
          ? req.body.operator118.isOperator118
          : false,
      },
    });

    const savedUser = await user.save();

    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// RETURN ALL ALERTS NEAR A GIVEN USER
router.get(
  "/:idUser/alerts",
  verifyToken((authData) => {
    if (authData.isVolunteer) return true;
    return false;
  }),
  async (req, res) => {
    try {
      if (!req) return res.status(400).send("Request is null");

      const user = await User.findById(req.params.idUser);

      if (!user) return res.status(404).send("User not found");
      if (user.volunteer.isAvailable === false)
        return res.status(400).send("User is not available");
      const userLatitude = user.latitude;
      const userLongitude = user.longitude;

      // Fetch all active alerts from the database
      const allActiveAlerts = await Alert.find({ isActive: true });

      // Filter the alerts based on their radius
      const availableAlerts = allActiveAlerts.filter((alert) => {
        const distance = Math.sqrt(
          Math.pow(alert.latitude - userLatitude, 2) +
            Math.pow(alert.longitude - userLongitude, 2)
        );

        return distance <= alert.radius;
      });

      if (availableAlerts === null)
        return res.status(404).send("List of availableAlert is null");

      if (availableAlerts.length === 0)
        return res.status(404).send("No alerts are in the radius of the user");

      return res.send(availableAlerts);
    } catch (err) {
      return res.status(501).send(err);
    }
  }
);

// MODIFY AVAILABILITY OF A VOLUNTEER, CHANGE CREDENTIALS, AGREE TO AN ALERT, UPGRADE/DOWNGRADE USER FROM/TO ROLE VOLUNTEER
router.patch(
  "/:userId",
  async (req, res) => {
    try {
      var message = "";
      if (!req) return res.status(400).send("Request is null");

      if (!req.params.userId)
        return res.status(400).send("User ID is required");

      if (mongoose.Types.ObjectId.isValid(req.params.userId) === false)
        return res.status(400).send("Invalid User ID");

      const user = await User.findOne({ _id: req.params.userId });

      if (!user) return res.status(404).send("User not found");

      // Change credentials if new username or password is provided (req.body.username, req.body.password)
      if (req.body.username !== undefined || req.body.password !== undefined) {
        const { error } = changeCredentialValidation(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        if (req.body.username) user.username = req.body.username;

        if (req.body.password) user.password = req.body.password;
        message = "User credentials updated successfully";
      }

      // Modify availability if isAvailable is provided (req.body.isAvailable)
      if (req.body.isAvailable !== undefined) {
        user.volunteer.isAvailable = req.body.isAvailable;
        user.volunteer.acceptedAlert = undefined;
        message = "User availability updated successfully";
      }

      //Agree to an alert if alertId is provided (req.body.alertId)
      if (req.body.alertId !== undefined) {
        if (user.volunteer.isVolunteer === false)
          return res.status(400).send("User is not a volunteer\n");

        if (user.volunteer.acceptedAlert === req.body.alertId)
          return res.status(400).send("User has already accepted the alert\n");

        if (mongoose.Types.ObjectId.isValid(req.body.alertId) === false)
          return res.status(400).send("Invalid Alert ID\n");

        const acceptedAlert = await Alert.findOne({ _id: req.body.alertId });

        if (!acceptedAlert)
          return res.status(400).send("Alert does not exist\n");

        if (acceptedAlert.isActive === false)
          return res.status(400).send("Alert is not active anymore\n");

        user.volunteer.acceptedAlert = req.body.alertId;
        message = "User assigned to alert successfully";
      }

      //Upgrade or downgrade user status
      if (req.body.isVolunteer !== undefined) {
        if (req.body.isVolunteer === false) {
          user.volunteer.isVolunteer = req.body.isVolunteer;
          user.volunteer.certificateCode = undefined;
          user.volunteer.acceptedAlert = undefined;
          message = "User is no longer a volunteer";
        }
        if (req.body.isVolunteer === true) {
          if (req.body.certificateCode === undefined)
            return res.status(400).send("Certificate code is required\n");

          user.volunteer.isVolunteer = req.body.isVolunteer;
          user.volunteer.certificateCode = req.body.certificateCode;
          message = "User is now a volunteer";
        }
      }
      await user.save();
      return res.status(200).send(message);
    } catch (err) {
      return res.status(501).send(err);
    }
  }
);

// DELETE USER
router.delete("/:userId", async (req, res) => {
  try {
    if (!req) return res.status(400).send("Request is null");

    if (!req.params.userId) return res.status(400).send("User ID is required");

    if (mongoose.Types.ObjectId.isValid(req.params.userId) === false)
      return res.status(400).send("Invalid User ID");

    const user = await User.findOne({ _id: req.params.userId });

    if (!user) return res.status(404).send("User not found");

    await user.deleteOne();
    return res.status(200).send("User deleted successfully");
  } catch (err) {
    return res.status(501).send(err);
  }
});
module.exports = router;
