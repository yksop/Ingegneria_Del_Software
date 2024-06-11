/*
    Open data di riferimento:
    https://www.comune.trento.it/Aree-tematiche/Cartografia/Download/Ambulatori-medici
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Clinic",
  new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    civico_num: { type: Number, required: false },
    civico_let: { type: String, required: false },
    civico_alf: { type: String, required: false },
    desvia: { type: String, required: true },
    strada: { type: Number, required: true },
    fumetto: { type: String, required: true },
  })
);
