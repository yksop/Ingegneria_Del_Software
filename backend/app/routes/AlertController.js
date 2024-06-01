const router = require("express").Router();
const User = require("../models/User");
const { Alert, triageTypes, emergencyTypes } = require("../models/Alert");
const mongoose = require("mongoose");
const { alertValidation } = require("../../validation");
const verifyToken = require("../middlewares/authMiddleware");

// Create and save new Alert in the DB
router.post(
  "",
  verifyToken((authData) => {
    if (authData.isOperator118) return true;
    return false;
  }),
  async (req, res) => {
    try {
      // Validate the data before creating a new Alert
      const { error } = alertValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      // Convert the numeric triage type to its string representation
      const triageType = triageTypes[req.body.triage];
      if (!triageType) return res.status(400).send("Invalid triage type");

      // Convert the numeric emergency type to its string representation
      const emergencyType = emergencyTypes[req.body.emergency];
      if (!emergencyType) return res.status(400).send("Invalid emergency type");

      // Create a new Alert
      const newAlert = new Alert({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        triage: triageType,
        emergency: emergencyType,
        radius: req.body.radius,
        expiresIn: req.body.expiresIn,
        isActive: req.body.isActive,
        description: req.body.description,
        timeForAmbulance: req.body.timeForAmbulance,
      });

      // If description is not provided, set it to an empty string
      if (!newAlert.description) newAlert.description = null;

      // If timeForAmbulance is not provided, set it to 0
      if (!newAlert.timeForAmbulance) newAlert.timeForAmbulance = null;

      // Check if there is an identical active Alert in the DB
      const identicalAlert = await Alert.findOne({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        triage: req.body.triage,
        radius: req.body.radius,
        expiresIn: req.body.expiresIn,
        isActive: true,
        description: req.body.description,
        timeForAmbulance: req.body.timeForAmbulance,
      });

      // If there is an identical active Alert in the DB, return an error
      if (identicalAlert)
        return res.status(400).send("Identical active Alert already exists");

      // Save the Alert in the DB
      const savedAlert = await newAlert.save();
      console.log("Alert saved in the DB");
      return res.send(savedAlert);
    } catch (err) {
      // print the error in the console
      console.log("Error in saving the Alert in the DB: " + err);
      // send the error in the response
      return res.status(400).send(err);
  }
}
);

// RETIRE ALERT
router.put(
  "/:id",
  verifyToken((authData) => {
    if (authData.isOperator118) return true;
    return false;
  }),
  async (req, res) => {
    try {
      if (!req.params.id) return res.status(400).send("Alert ID is required\n");

      if (mongoose.Types.ObjectId.isValid(req.params.id) === false)
        return res.status(400).send("Invalid Alert ID\n");

      const result = await Alert.updateOne(
        { _id: req.params.id },
        { isActive: false }
      ).exec();

      if (result.matchedCount === 0)
        return res.status(404).send("Alert not found, no updates were made\n");

      if (result.modifiedCount === 0)
        return res
          .status(400)
          .send("Alert is already non-active, no updates were made\n");

      return res.status(200).send("Alert updated successfully\n");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

// Get alert from DB
router.get(
  "/:id",
  verifyToken((authData) => {
    if (authData.isVolunteer || authData.isOperator118) return true;
    return false;
  }),
  async (req, res) => {
    try {
      if (!req.params.id) return res.status(400).send("Alert ID is required\n");

      if (mongoose.Types.ObjectId.isValid(req.params.id) === false)
        return res.status(400).send("Invalid Alert ID\n");

      const foundAlert = await Alert.findById(req.params.id);

      if (!foundAlert) res.status(400).send("Alert does not exist\n");

      res.status(200).send(foundAlert);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

// GET all active alerts
router.get(
  "",
  verifyToken((authData) => {
    if (authData.isOperator118 || authData.isVolunteer) return true;
    return false;
  }),
  async (req, res) => {
    try {
      const activeAlerts = await Alert.find({ isActive: true });

      if (!activeAlerts)
        return res.status(404).send("No active alerts found\n");

      res.send(activeAlerts);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

// Given an Alert id, I want to get all the users that are in the radius of that Alert
router.get(
  "/:id/users",
  verifyToken((authData) => {
    if (authData.isOperator118 || authData.isVolunteer) return true;
    return false;
  }),
  async (req, res) => {
    try {
      // I check if the request is null
      if (!req) return res.status(400).send("Request is null");

      // Find the Alert with the given id
      const alert = await Alert.findById(req.params.id);

      // If the Alert does not exist, return an error
      if (!alert) return res.status(404).send("Alert not found");

      // If the Alert is not active, return an error
      if (!alert.isActive) return res.status(400).send("Alert is not active");

      // Extract the latitude and longitude of the Alert
      const alertLatitude = alert.latitude;
      const alertLongitude = alert.longitude;

      // Extract the radius of the Alert
      const alertRadius = alert.radius;

      // Find all the users that are in the radius of the Alert
      const eligibleUsers = await User.find({
        latitude: {
          $gte: alertLatitude - alertRadius,
          $lte: alertLatitude + alertRadius,
        },
        longitude: {
          $gte: alertLongitude - alertRadius,
          $lte: alertLongitude + alertRadius,
        },
        isVolunteer: true,
      });

      // If eligibleUsers is null, return an error
      if (eligibleUsers === null)
        return res.status(404).send("List of eligibleUsers is null");

      // If the list is empty, return an error
      if (eligibleUsers.length === 0)
        return res.status(404).send("No users are in the radius of the Alert");

      // Return the users in the radius of the Alert
      return res.send(eligibleUsers);

      // N.B.: $gte and $lte are MongoDB operators that mean "greater than or equal" and "less than or equal" respectively.
      // $gte: alertLatitude - alertRadius means "greater than or equal to the latitude of the Alert minus the radius of the Alert".
      // $lte: alertLatitude + alertRadius means "less than or equal to the latitude of the Alert plus the radius of the Alert".
      // If the Alert is at latitude 10 and longitude 20, and the radius is 5, the latitude range is [5, 15] and the longitude range is [15, 25].
    } catch (err) {
      console.log(err);
      return res.status(501).send(err);
    }
  }
);

module.exports = router;
