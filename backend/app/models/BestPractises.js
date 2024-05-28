const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "BestPractises",
  new Schema({
    title: { type: String, required: true },
    advise: { type: String, required: false },
  })
);
