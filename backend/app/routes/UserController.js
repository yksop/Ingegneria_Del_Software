const router = require("express").Router();
const User = require("../models/User");
const Alert = require("../models/Alert");
const { registerValidation } = require("../../validation");
const { validateLogin } = require("../../validation"); // I use {} to extract only the validateLogin property.
const mongoose = require("mongoose");

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
    console.log(err);
    res.status(400).send(err);
  }
});

// AGREE TO ALERT
router.put("/:userId", async (req, res) => {
  try {
    if (!req) return res.status(400).send("Request is null\n");

    if (!req.params.userId)
      return res.status(400).send("User ID is required\n");

    if (mongoose.Types.ObjectId.isValid(req.params.userId) === false)
      return res.status(400).send("Invalid User ID\n");

    if (!req.body.alertId)
      return res.status(400).send("Alert ID is required\n");

    if (mongoose.Types.ObjectId.isValid(req.body.alertId) === false)
      return res.status(400).send("Invalid Alert ID\n");

    const queriedUser = await User.findOne({ _id: req.params.userId });

    if (queriedUser === null)
      return res.status(404).send("The given user does not exist\n");

    if (queriedUser.volunteer.isVolunteer === false)
      return res.status(400).send("User is not a volunteer\n");

    if (queriedUser.volunteer.acceptedAlert === req.body.alertId)
      return res.status(400).send("User has already accepted the alert\n");

    if (queriedUser.acceptedAlert != undefined)
      return res.status(400).send("User is already busy with another alert\n");

    const acceptedAlert = await Alert.findOne({ _id: req.body.alertId });

    if (!acceptedAlert) return res.status(400).send("Alert does not exist\n");

    if (acceptedAlert.isActive === false)
      return res.status(400).send("Alert is not active anymore\n");

    var result = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          "volunteer.acceptedAlert": req.body.alertId,
        },
      }
    );

    if (result.matchedCount === 0)
      return res.status(404).send("User not found\n");

    if (result.modifiedCount === 0)
      return res.status(400).send("User has already accepted the alert\n");

    return res.status(200).send("User assigned to alert successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// UPGRADE/DOWNGRADE USER FROM/TO ROLE VOLUNTEER
router.put("/volunteers/:volunteerId", async (req, res) => {
  try {
    if (!req) return res.status(400).send("Request is null\n");

    if (!req.params.volunteerId)
      return res.status(400).send("User ID is required\n");

    if (mongoose.Types.ObjectId.isValid(req.params.volunteerId) === false)
      return res.status(400).send("Invalid User ID\n");

    const queriedUser = await User.findOne({ _id: req.params.volunteerId });

    if (queriedUser === null)
      return res.status(404).send("The given user does not exist\n");

    if (queriedUser.isVolunteer === true)
      return res.status(400).send("User is already a volunteer\n");

    if (req.body.certificateCode === undefined)
      return res.status(400).send("Certificate code is required\n");

    if (req.body.isVolunteer === false) {
      console.log("isVolunteer is false");
      var result = await User.updateOne(
        { _id: req.params.volunteerId },
        {
          $set: {
            "volunteer.isVolunteer": req.body.isVolunteer,
          },
          $unset: {
            "volunteer.certificateCode": "",
          },
        }
      );
    }

    if (req.body.isVolunteer === true) {
      console.log("isVolunteer is true");
      var result = await User.updateOne(
        { _id: req.params.volunteerId },
        {
          $set: {
            "volunteer.isVolunteer": req.body.isVolunteer,
            "volunteer.certificateCode": req.body.certificateCode,
          },
        }
      );
    }
    console.log(result);
    if (result.modifiedCount === 0) {
      if (req.body.isVolunteer === true) {
        return res.status(400).send("User is already a volunteer");
      } else {
        return res
          .status(400)
          .send("User doesn't require changes, is not a volunteer");
      }
    }
    return res.status(200).send("User updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// RETURN ALL ALERTS NEAR A GIVEN USER
router.get("/:idUser/alerts", async (req, res) => {
  try {
    if (!req) return res.status(400).send("Request is null");

    const user = await User.findById(req.params.idUser);

    if (!user) return res.status(404).send("User not found");

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
    console.log(err);
    return res.status(501).send(err);
  }
});
module.exports = router;
