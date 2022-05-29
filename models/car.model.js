const mongoose = require("mongoose");

// Mongoose schema
const carSchema = new mongoose.Schema({
  Model: {
    type: String,
    required: true,
  },
  Make: {
    type: String,
    required: true,
  },
  Colour: {
    type: String,
    required: false,
  },

  RegNo: {
    type: String,
    required: false,
  },
  Owner: {
    type: String,
    required: false,
  },
  Address: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Car", carSchema);
