const mongoose = require("mongoose");

// -------faculty feedback schema---------
const facultyfeedback = new mongoose.Schema({
  Professor: {
    type: String,
    require: true,
  },
  voice: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  Presentation: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  Communication: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  Interest: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  knowledge: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  assessible: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  simulation: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  encourage: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  puntual: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  overall: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  }
});

const Feedback = mongoose.model("feedback", facultyfeedback);

module.exports = Feedback;
