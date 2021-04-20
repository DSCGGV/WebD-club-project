const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../db/userSchema");
const path = require("path");

router.get("/", (req, res) => {
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

router.post("/feedback", (req, res) => {
  console.log(req.body);
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
      name,
      email,
      enrollment,
      department,
      semester,
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

module.exports = router;
