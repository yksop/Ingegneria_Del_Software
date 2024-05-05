const router = require("express").Router();
const Alert = require("../models/Alert");
const mongoose = require("mongoose");

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
