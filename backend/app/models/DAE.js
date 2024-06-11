/*
    Open data di riferimento:
    https://www.comune.trento.it/Aree-tematiche/Cartografia/Download/Defibrillatori
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "DAE",
  new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    id: { type: Number, required: true },
    codvia: { type: Number, required: true },
    desvia: { type: String, required: true },
    fumetto: { type: String, required: true },
  })
);
