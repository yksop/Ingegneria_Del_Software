const router = require("express").Router();
const User = require("../models/User");
const Alert = require("../models/Alert");
const mongoose = require("mongoose");


// Create and save new Alert in the DB
router.post("", async (req, res) => {
  // Create a new Alert
  const alert = new Alert({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    type: req.body.type,
    description: req.body.description,
    radius: req.body.radius,
    expiresIn: req.body.expiresIn,
    isActive: req.body.isActive,
    timeForAmbulance: req.body.timeForAmbulance,
  });
  
  try {
    // Save the Alert in the DB 
    const savedAlert = await alert.save();
    console.log("Alert saved in the DB");
    res.send(savedAlert);
  } catch (err) {
    // print the error in the console
    console.log("Error in saving the Alert in the DB: " + err);
    // send the error in the response
    res.status(400).send(err);
  }
});


module.exports = router;
