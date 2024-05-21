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

// Retrieve all DAEs from the DB
router.get("", async (req, res) => {
  try {
    // Return all DAEs from the DAE db
    const daes = await DAE.find();
    console.log("DAEs retrieved from the DB");
    return res.send(daes);
  } catch (err) {
    // print the error in the console
    console.log("Error in retrieving DAEs from the DB: " + err);
    // send the error in the response
    return res.status(400).send(err);
  }
});

// Retrieve a specific DAE from the DB
router.get("/:id", async (req, res) => {
  try {
    // Check if the request is null
    if (!req.params.id) return res.status(400).send("DAE ID is required\n");

    if(mongoose.Types.ObjectId.isValid(req.params.id) === false)
        return res.status(400).send("Invalid DAE ID\n");

    // Return the DAE with the specified id
    const foundDAE = await DAE.findById(req.params.id);
    console.log("DAE retrieved from the DB");
    return res.send(foundDAE);
  } catch (err) {
    // print the error in the console
    console.log("Error in retrieving DAE from the DB: " + err);
    // send the error in the response
    return res.status(400).send(err);
  }
});


// Update a specific DAE in the DB
router.put("/:id", async (req, res) => {
  try {
    // Check if the request is null
    if (!req.params.id) return res.status(400).send("DAE ID is required\n");

    if(mongoose.Types.ObjectId.isValid(req.params.id) === false)
        return res.status(400).send("Invalid DAE ID\n");

    // Update the DAE with the specified id
    const result = await DAE.updateOne(
      { _id: req.params.id },
      { 
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        id: req.body.id,
        codvia: req.body.codvia,
        desvia: req.body.desvia,
        fumetto: req.body.fumetto,
      }
    ).exec();

    if (result.matchedCount === 0)
      return res.status(400).send("DAE not found\n");

    console.log("DAE updated in the DB");
    return res.send(result);
  } catch (err) {
    // print the error in the console
    console.log("Error in updating DAE in the DB: " + err);
    // send the error in the response
    return res.status(400).send(err);
  }
});


// Delete a specific DAE from the DB
router.delete("/:id", async (req, res) => {
  try {
    // Check if the request is null
    if (!req.params.id) return res.status(400).send("DAE ID is required\n");

    if(mongoose.Types.ObjectId.isValid(req.params.id) === false)
        return res.status(400).send("Invalid DAE ID\n");

    // Delete the DAE with the specified id
    const result = await DAE.deleteOne({ _id: req.params.id }).exec();

    if (result.deletedCount === 0)
      return res.status(400).send("DAE not found\n");

    console.log("DAE deleted from the DB");
    return res.send(result);
  } catch (err) {
    // print the error in the console
    console.log("Error in deleting DAE from the DB: " + err);
    // send the error in the response
    return res.status(400).send(err);
  }
});


module.exports = router;
