const router = require("express").Router();
const BestPractises = require("../models/BestPractises");
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/authMiddleware");

router.post("", async (req, res) => {
  try {
    if (!req) return res.status(400).send("Request is null\n");
    const newBestPractises = new BestPractises({
      title: req.body.title,
      advise: req.body.advise.replace(/\\n/g, "<br/>"),
    });

    if (!newBestPractises.title)
      return res.status(400).send("Title is required");
    if (!newBestPractises.description) newBestPractises.description = null;

    const savedBestPractises = await newBestPractises.save();
    return res.status(200).send(savedBestPractises);
  } catch (err) {
    return res.status(400).send;
  }
});

router.get("/", async (req, res) => {
  try {
    if (!req) return res.status(400).send("Request is null\n");

    if (!req.query.title)
      return res.status(400).send("Best Practise title is required\n");
    const title = req.query.title;

    const bestPractises = await BestPractises.findOne({ title: title });

    if (!bestPractises) return res.status(400).send("Best practises not found");

    return res.status(200).send(bestPractises);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
