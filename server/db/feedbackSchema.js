const mongoose = require("mongoose");

// -------faculty feedback schema---------
var facultyfeedback = new mongoose.Schema({
  Professor: {
    type: String,
  },
  
  count :{ type:Number},
  
  voice_total:{
    type: Number,
    
  },
  
  voice_avg:{ type:Number},
  
  speed_total:{
    type: Number,
    
  },
  
  speed_avg:{ type:Number},
  
  Presentation_total:{
    type: Number,
    
  },

  Presentation_avg:{ type:Number},
  
  Communication_total: {
    type: Number,

  },

  Communication_avg:{ type:Number},
  
  Interest_total:{
    type: Number,
  },

  Interest_avg:{ type:Number},
  
  knowledge_total:{
    type: Number,

  },

  kowledge_avg:{ type:Number},
  
  assessible_total:{
    type: Number,

  },
  
  assessible_avg:{ type:Number},
  
  simulation_total:{
    type: Number,
    
  },

  simulation_avg:{ type:Number},
  
  encourage_total:{
    type: Number,

  },

  encourage_avg:{ type:Number},
  
  punctual_total: {
    type: Number,

  },

  punctual_avg:{ type:Number},
  
  overall_total: {
    type: Number,
  },

  overall_avg:{ type:Number},

  
});

var Feedback = mongoose.model("feedback", facultyfeedback);

module.exports = Feedback;
