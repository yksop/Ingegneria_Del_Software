const router = require("express").Router();
const User = require("../models/User");
const Alert = require("../models/Alert");
const mongoose = require("mongoose");
const { alertValidation } = require("../../validation");


// Create and save new Alert in the DB
router.post("", async (req, res) => {
  try {
    // Validate the data before creating a new Alert
    const { error } = alertValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new Alert
    const newAlert = new Alert({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      triage: req.body.triage,
      radius: req.body.radius,
      expiresIn: req.body.expiresIn,
      isActive: req.body.isActive,
      description: req.body.description,
      timeForAmbulance: req.body.timeForAmbulance,
    });

    // If description is not provided, set it to an empty string
    if (!newAlert.description) newAlert.description = "";

    // If timeForAmbulance is not provided, set it to 0
    if (!newAlert.timeForAmbulance) newAlert.timeForAmbulance = 0;

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
    if (identicalAlert) return res.status(400).send("Identical active Alert already exists");
    
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
});


router.put("/:id", async (req, res) => {
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
});


// Get alert from DB
router.get("/:id", async (req, res) => {
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
});


module.exports = router;
