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
