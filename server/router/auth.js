const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../db/userSchema");
const path = require("path");
const Teacher = require("../db/teacherSchema");



// router.get("/", (req, res) => {
//   console.log(req.url);
//   res.send(`Home Page`);
// });
router.get("/register", (req, res) => {
  if(req.query.user =="student")
  {
    res.sendFile(path.join(__dirname+'../../../public/html/student.html'))
  }
  if(req.query.user =="admin")
  {
    res.sendFile(path.join(__dirname+'../../../public/html/admin_login.html'))
  }
});
router.get("/feedback", (req, res) => {
  res.sendFile(path.join(__dirname+'../../../public/html/feedback.html'))
  
});
router.get("/result", (req, res) => {
  res.send(`Result Page`);
});
router.get("/admin", (req, res) => {
  res.send(`Admin Page`);
});


//student login post request
router.post("/studentlogin", (req, res) => {
  const { enrollment, department, semester } = req.body;

  if (!enrollment || !department || !semester) {
    return res.status(422).json({ error: "Please Fill all the fields" });
  }

  User.findOne({ enrollment: enrollment }).then((userExist) => {
    if (userExist) {
      return res.status(422).json({ error: "User Already Exist" });
    }

    const user = new User({
      enrollment: req.body.enrollment,
      department: req.body.department,
      semester: req.body.semester,
    });
    user
      .save()
      .then(() => {
        res.redirect('/feedback')
        res.status(201).json({ message: "User Registered Sucessfully" })
        
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed To Register User" });
        console.log("error posting data :" + err)
      });
  });
});

// router.post("/feedback", (req, res) => {
//   const { name, feedbackBy } = req.body;
//   // console.log(req.body.name);
//   // console.log(req.body);
//   console.log(typeof req.body.feedbackBy);

//   if (!name || !feedbackBy) {
//     return res.status(422).json({ error: "Please Fill all the field" });
//   }

//   // Teacher.findOne({ name: name }).then((teacherExist) => {});
// });

module.exports = router;
