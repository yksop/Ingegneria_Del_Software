const router = require("express").Router();
const Clinic = require("../models/Clinic");
const mongoose = require("mongoose");
const { clinicValidation } = require("../../validation");

// Create a new clinic
router.post("/", async (req, res) => {
  // Validate the data before creating a new clinic
  const { error } = clinicValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new clinic
  const clinic = new Clinic({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    civico_num: req.body.civico_num,
    civico_let: req.body.civico_let,
    civico_alf: req.body.civico_alf,
    desvia: req.body.desvia,
    strada: req.body.strada,
    fumetto: req.body.fumetto,
  });

  // Check if there is an identical clinic in the DB
  const identicalClinic = await Clinic.findOne({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    civico_num: req.body.civico_num,
    civico_let: req.body.civico_let,
    civico_alf: req.body.civico_alf,
    desvia: req.body.desvia,
    strada: req.body.strada,
    fumetto: req.body.fumetto,
  });

  // If there is an identical active clinic in the DB, return an error
  if (identicalClinic)
    return res.status(400).send("Identical active clinic already exists");

  try {
    const savedClinic = await clinic.save();
    res.send(savedClinic);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Retrieve all clinics from the DB
router.get("", async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.send(clinics);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Retrieve a clinic by id
router.get("/:id", async (req, res) => {
  try {
    // Check if the request is null
    if (!req.params.id) return res.status(400).send("No clinic ID provided");

    // Check if the requested clinic id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid clinic ID");

    const clinic = await Clinic.findById(req.params.id);
    res.send(clinic);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
