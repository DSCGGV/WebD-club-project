const mongooose = require("mongoose");

const userSchema = new mongooose.Schema({
  
  enrollment: {
    type: Number,
    required: true,
  },
  
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  
  time: {
    type: Date,
    default: Date.now,
  },
});

const User = mongooose.model("user", userSchema);

module.exports = User;
