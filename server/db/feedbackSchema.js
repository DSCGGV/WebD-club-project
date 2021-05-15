const mongoose = require("mongoose");

// -------faculty feedback schema---------
var facultyfeedback = new mongoose.Schema({
  Professor:  String,
  department : String,
  count :Number,
  voice_total: Number,
  voice_avg: Number,
  speed_total: Number,
  speed_avg: Number,
  Presentation_total: Number,
  Presentation_avg: Number,
  Communication_total: Number,
  Communication_avg: Number,
  Interest_total: Number,
  Interest_avg: Number,
  knowledge_total: Number,
  knowledge_avg: Number,
  assessible_total: Number,
  assessible_avg: Number,
  simulation_total: Number,
  simulation_avg: Number,
  encourage_total: Number,
  encourage_avg: Number,
  Punctual_total: Number,
  Punctual_avg: Number,
  overall_total: Number,
  overall_avg: Number,
},
// { typeKey: '$type' },
);
var Feedback = mongoose.model("feedback", facultyfeedback);
module.exports = Feedback;
