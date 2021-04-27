const mongoose = require("mongoose");

// -----------faculty list schema--------------

const faculty = new mongoose.Schema({
    department :{
      type: String,
      required : true
    },
    faculty:[
      {name: String,
        id:Number,
      }
    ]
  })
  
  const list = mongoose.model("facultylist", faculty);
  
  module.exports = list;