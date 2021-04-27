const mongoose = require("mongoose");

// -------faculty feedback schema---------
const facultyfeedback = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  q1: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q2: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q3: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q4: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q5: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q6: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q7: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q8: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q9: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q10: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  q11: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

const Teacher = mongoose.model("feedback", facultyfeedback);

module.exports = Teacher;
