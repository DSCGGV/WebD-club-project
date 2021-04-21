const mongoose = require(mongoose);

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feedbackBy: [
    {
      nameOfStudent: {
        type: String,
        required: true,
      },
      enrollmentId: {
        type: Number,
        required: true,
      },
      feedback: [
        {
          questionId: {
            type: Number,
            required: true,
          },
          response: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

const Teacher = mongoose.model("TEACHER", teacherSchema);
module.exports = Teacher;
