/*
    Open data di riferimento:
    https://www.comune.trento.it/Aree-tematiche/Cartografia/Download/Ospedali
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Hospital",
  new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    nome: { type: String, required: true },
    tipo: { type: String, required: true },
    via: { type: String, required: true },
    civico: { type: Number, required: false },
  })
);
