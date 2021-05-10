// -----routing and post/get api-------

const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../db/userSchema");
const path = require("path");
const Faculty = require("../db/facultySchema");
const Admin = require("../db/adminSchema");
const Feedback = require("../db/feedbackSchema");
const sessionStorage = require("node-sessionstorage");



// router.get("/", (req, res) => {
//   console.log(req.url);
//   res.send(`Home Page`);
// });
router.get("/register", (req, res) => {
  if (req.query.user == "student") {
    res.sendFile(path.join(__dirname + "../../../public/html/student.html"));
  }
  if (req.query.user == "admin") {
    res.sendFile(
      path.join(__dirname + "../../../public/html/admin_login.html")
    );
  }
});
router.get("/feedback", async (req, res) => {
  // res.render('feedback')
  // console.log(sessionStorage.getItem('enrollment'));

  var enrollment = sessionStorage.getItem("enrollment");
  const user = await User.findOne({ enrollment: enrollment });
  const department = user.department;
  const semester = user.semester;
  // const faculties = await Faculty.findOne({
  //   department: department,
  //   semester: semester,
  // });
  // const facultyList = faculties.faculty;
  // console.log(facultyList);
  var facultydata = Faculty.find({
    department: department,
    semester: semester,
  }); 
  facultydata.exec(function (err, data) {
    if (err) throw err;

    res.render("feedback", { record: data });
    // console.log(data);
  });
  
});

router.get("/result", (req, res) => {
  res.send(`Result Page`);
});


router.get("/admin", (req, res) => {
  res.render('dashboard')
});

router.get("/editFaculty", (req, res) => {
  res.render('edit_faculty')
});

router.get("/departmentreport", (req, res) => {
  res.render('dept_wise')
});

router.get("/facultyreport", (req, res) => {
  res.render('faculty_wise')
});




//admin login post request
router.post("/adminlogin", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  if (!email || !pass) {
    return res.status(422).json({ error: "Please fill both the fields!" });
  }
  try {
    const admin = await Admin.findOne({ email: email });

    if (admin.pass == pass) {
      res.status(201).redirect("/admin");
      console.log("Logged In Successfully.");
    } else {
      res.status(422).send("Invalid Email/Password.");
    }
  } catch (error) {
    res.status(422).send("Invalid Email/Password.");
  }
});

//student login post request
router.post("/studentlogin", (req, res) => {
  const { enrollment, department, semester } = req.body;

  if (!enrollment || !department || !semester) {
    return res.status(422).json({ error: "Please Fill all the fields" });
  }

  User.findOne({ enrollment: enrollment }).then((userExist) => {
    if (userExist) {
      res.status(422).json({ error: "User Already Exist" });
      return;
    }

    const user = new User({
      enrollment: req.body.enrollment,
      department: req.body.department,
      semester: req.body.semester,
    });
    user
      .save()
      .then(() => {
        res.redirect("/feedback");
        sessionStorage.setItem("enrollment", req.body.enrollment);
        res.status(201).json({ message: "User Registered Sucessfully" });
        res.redirect("/feedback");
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed To Register User" });
        console.log("error posting data :" + err);
      });
  });
});

router.post("/feedback", (req, res) => {
  console.log(req.body);
  const {
    Professor,
    voice,
    speed,
    Presentation,
    Communication,
    Interest,
    knowledge,
    assessible,
    simulation,
    encourage,
    puntual,
    overall,
  } = req.body;

  if (
    !voice ||
    !speed ||
    !Presentation ||
    !Communication ||
    !Interest ||
    !knowledge ||
    !assessible ||
    !simulation ||
    !encourage ||
    !puntual ||
    !overall
  ){
    return res.status(422).json({ error: "Please Fill all the fields" });
  }
  
  Feedback.updateOne(
    { Professor : req.body.Professor },
    { $inc:{ count:1,
      voice_total:req.body.voice,
      speed_total:req.body.speed,
      Presentation_total:req.body.Presentation,
      Communication_total:req.body.Communication,
      Interest_total:req.body.Interest,
      knowledge_total:req.body.knowledge,
      assessible_total:req.body.assessible,
      simulation_total:req.body.simulation,
      encourage_total:req.body.encourage,
      punctual_total:req.body.puntual,
      overall_total:req.body.overall,
    },
    // voice_avg : {$divide:["voice_total" , "count"]  }
  
  }).then(()=> {
    console.log("data updated  successfully!!")
  })            
  
  // const feedback = new Feedback({
  //   Professor,
  //   voice,
  //   speed,
  //   Presentation,
  //   Communication,
  //   Interest,
  //   knowledge,
  //   assessible,
  //   simulation,
  //   encourage,
  //   puntual,
  //   overall
  // });

  // feedback
  //   .save()
  //   .then(() => {
  //     res.redirect("/feedback");
  //     res.status(201).json({ message: "Feedback  Registered  Sucessfully" });
  //     alert("Feedback  Registered  Sucessfully")
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: "Failed To Register feedback" });
  //     console.log("error posting data :" + err);
  //   });   
  
  });


//  router.post("/addfaculty", (req, res) => {
//   // crud faculty details code
//   console.log("/editfaculty called");
//   const { department, faculty } = req.body;

//   if (!department || !faculty) {
//     return res.status(422).json({ error: "Please Fill all the fields" });
//   }

//   Faculty.findOne({ faculty: faculty }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "User Already Exist" });
//     }

//     const facultylist = new Faculty({
//       department: req.body.department,
//       faculty: req.body.faculty,
//     });
//     facultylist
//       .save()
//       .then(() => {
//         res.redirect("/feedback");
//         res.status(201).json({ message: "Faculty added Sucessfully" });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: "Failed To add Faculty" });
//         console.log("error posting data :" + err);
//       });
//   });
// });
module.exports = router;
