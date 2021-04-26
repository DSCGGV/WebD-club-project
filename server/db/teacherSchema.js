const mongoose = require("mongoose");

// -------faculty feedback schema---------
const facultyfeedback = new mongoose.Schema({
  name :String,
  q1 :{
    type:Number,
    required : true
  },  
  q2 :{
    type:Number,
    required : true
  },  
  q3 :{
    type:Number,
    required : true
  },  
  q4 :{
    type:Number,
    required : true
  },  
  q5 :{
    type:Number,
    required : true
  },  
  q6 :{
    type:Number,
    required : true
  },  
  q7 :{
    type:Number,
    required : true
  },  
  q8 :{
    type:Number,
    required : true
  },  
  q9 :{
    type:Number,
    required : true
  },  
  q10 :{
    type:Number,
    required : true
  },  
  q11:{
    type:Number,
    required : true
  },  
});

// -----------faculty list schema--------------

const facultylist = new mongoose.Schema({
  department :{
    type: String,
    required : true
  },
  faculty: [{
    name : String,
  }]
})

const Teacher = mongoose.model("feedback", facultyfeedback);
module.exports = Teacher;
