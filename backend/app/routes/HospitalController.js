const router = require("express").Router();
const Hospital = require("../models/Hospital");
const mongoose = require("mongoose");
const { hospitalValidation } = require("../../validation");

// Create a new hospital
router.post("", async (req, res) => {
  // Validate the data before creating a new hospital
  const { error } = hospitalValidation(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  // Create a new hospital
  const hospital = new Hospital({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    nome: req.body.nome,
    tipo: req.body.tipo,
    via: req.body.via,
    civico: req.body.civico,
  });

  // Check if there is an identical hospital in the DB
  const identicalHospital = await Hospital.findOne({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    nome: req.body.nome,
    tipo: req.body.tipo,
    via: req.body.via,
    civico: req.body.civico,
  });

  // If there is an identical active hospital in the DB, return an error
  if (identicalHospital)
    return res.status(402).send("Identical active hospital already exists");

  try {
    const savedHospital = await hospital.save();
    return res.status(200).send(savedHospital);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Retrieve all hospitals from the DB
router.get("", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    return res.status(200).send(hospitals);
  } catch (err) {
    return res.status(403).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedHospital = await Hospital.findOne({ _id: req.params.id });
    if (!removedHospital) return res.status(404).send("Hospital not found");
    await removedHospital.deleteOne();
    return res.status(200).send("Hospital deleted successfully");
  } catch (err) {
    return res.status(404).send(err);
  }
});


module.exports = router;
