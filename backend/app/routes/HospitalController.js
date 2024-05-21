const router = require("express").Router();
const Hospital = require("../models/Hospital");
const mongoose = require("mongoose");
const { hospitalValidation } = require("../../validation");

// Create a new hospital
router.post("", async (req, res) => {
  // Validate the data before creating a new hospital
  const { error } = hospitalValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new hospital
  const hospital = new Hospital({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    id: req.body.id,
    codvia: req.body.codvia,
    desvia: req.body.desvia,
    fumetto: req.body.fumetto,
  });

  // Check if there is an identical hospital in the DB
  const identicalHospital = await Hospital.findOne({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    id: req.body.id,
    codvia: req.body.codvia,
    desvia: req.body.desvia,
    fumetto: req.body.fumetto,
  });

  // If there is an identical active hospital in the DB, return an error
  if (identicalHospital)
    return res.status(400).send("Identical active hospital already exists");

  try {
    const savedHospital = await hospital.save();
    res.send(savedHospital);
  } catch (err) {
    res.status;
  }
});

// Retrieve all hospitals from the DB
router.get("", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.send(hospitals);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
