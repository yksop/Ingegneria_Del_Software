const router = require("express").Router();
const BestPractises = require("../models/BestPractises");
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/authMiddleware");

router.post("", async (req, res) => {
  try {
    const newBestPractises = new BestPractises({
      title: req.body.title.replace(/\\n/g, "<br/>"),
      advise: req.body.advise.replace(/\\n/g, "<br/>"),
    });

    if (!newBestPractises.title)
      return res.status(400).send("Title is required");
    if (!newBestPractises.description) newBestPractises.description = null;

    const savedBestPractises = await newBestPractises.save();
    console.log("New best practises saved in the DB");
    return res.send(savedBestPractises);
  } catch (err) {
    console.log("Error in saving new best practises in the DB");
    return res.status(400).send;
  }
});

router.get("/", async (req, res) => {
  try {
    const title = req.query.title;
    const bestPractises = await BestPractises.findOne({ title: title });

    if (!bestPractises) return res.status(400).send("Best practises not found");

    return res.send(bestPractises);
  } catch (err) {
    console.log("Error in getting best practises from the DB");
    return res.status(400).send(err);
  }
});
module.exports = router;
