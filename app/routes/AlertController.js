const router = require("express").Router();
const Alert = require("../models/Alert");
const mongoose = require("mongoose");

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
