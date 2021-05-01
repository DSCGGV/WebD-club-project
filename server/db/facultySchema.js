const mongoose = require("mongoose");

// -----------faculty list schema--------------

const facultySchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    require: true,
  },
  faculty1: String,
  faculty2: String,
  faculty3: String,
  faculty4: String,
});

const Faculty = mongoose.model("facultylist", facultySchema);

module.exports = Faculty;
