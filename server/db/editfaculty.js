const mongoose = require("mongoose");

// -----------faculty list schema--------------

const faculty = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  faculty: [String],
});

const Faculty = mongoose.model("facultylist", faculty);

module.exports = Faculty;
