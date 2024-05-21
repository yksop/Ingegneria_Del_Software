const router = require("express").Router();
const DAE = require("../models/DAE");
const mongoose = require("mongoose");
const { daeValidation } = require("../../validation");

// Create and save new DAE in the DB
router.post("", async (req, res) => {
  try {
    // Validate the data before creating a new DAE
    const { error } = daeValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new DAE
    const newDAE = new DAE({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      id: req.body.id,
      codvia: req.body.codvia,
      desvia: req.body.desvia,
      fumetto: req.body.fumetto,
    });

    // Check if there is an identical active DAE in the DB
    const identicalDAE = await DAE.findOne({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      id: req.body.id,
      codvia: req.body.codvia,
      desvia: req.body.desvia,
      fumetto: req.body.fumetto,
    });

    // If there is an identical active DAE in the DB, return an error
    if (identicalDAE)
      return res.status(400).send("Identical active DAE already exists");

    // Save the DAE in the DB
    const savedDAE = await newDAE.save();
    console.log("DAE saved in the DB");
    return res.send(savedDAE);
  } catch (err) {
    // print the error in the console
    console.log("Error in saving the DAE in the DB: " + err);
    // send the error in the response
    return res.status(400).send(err);
  }
});

module.exports = router;
