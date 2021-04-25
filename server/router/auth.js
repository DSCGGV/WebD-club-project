const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../db/userSchema");
const path = require("path");
const Teacher = require("../db/teacherSchema");

router.get("/", (req, res) => {
  console.log(req.url);
  res.send(`Home Page`);
});
router.get("/register", (req, res) => {
  res.send(`Register Page`);
});
router.get("/feedback", (req, res) => {
  res.send(`Feedback Page`);
});
router.get("/result", (req, res) => {
  res.send(`Result Page`);
});
router.get("/admin", (req, res) => {
  res.send(`Admin Page`);
});

router.post("/register", (req, res) => {
  const { name, email, enrollment, department, semester } = req.body;

  if (!name || !email || !enrollment || !department || !semester) {
    return res.status(422).json({ error: "Please Fill all the field" });
  }

  User.findOne({ enrollment: enrollment }).then((userExist) => {
    if (userExist) {
      return res.status(422).json({ error: "User Already Exist" });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      enrollment: req.body.enrollment,
      department: req.body.department,
      semester: req.body.semester,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({ message: "User Registered Sucessfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed To Register User" });
      });
  });
});

router.post("/feedback", (req, res) => {
  const { name, feedbackBy } = req.body;
  // console.log(req.body.name);
  // console.log(req.body);
  console.log(typeof req.body.feedbackBy);

  if (!name || !feedbackBy) {
    return res.status(422).json({ error: "Please Fill all the field" });
  }

  // Teacher.findOne({ name: name }).then((teacherExist) => {});
});

module.exports = router;
