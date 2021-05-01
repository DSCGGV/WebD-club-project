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
  faculty: [String],
});

const Faculty = mongoose.model("facultylist", facultySchema);

module.exports = Faculty;
