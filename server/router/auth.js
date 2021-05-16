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
const { find, count } = require("../db/feedbackSchema");

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
  res.render("dashboard");
});

router.get("/departmentreport", (req, res) => {
  const DepartmentList = ["IT", "CSE", "MECH", "ECE", "IPE", "CHEM", "CIVIL"];
  res.render("dept_wise");

  const departmentWiseData = [];
  DepartmentList.map((department) => {
    Feedback.find({ department }, (err, data) => {
      const element = {
        department: "",
        count: 0,
        voice_total: 0,
        speed_total: 0,
        Presentation_total: 0,
        Communication_total: 0,
        Interest_total: 0,
        knowledge_total: 0,
        assessible_total: 0,
        simulation_total: 0,
        encourage_total: 0,
        overall_total: 0,
        voice_avg: 0,
        speed_avg: 0,
        Presentation_avg: 0,
        Communication_avg: 0,
        Interest_avg: 0,
        knowledge_avg: 0,
        assessible_avg: 0,
        simulation_avg: 0,
        encourage_avg: 0,
        overall_avg: 0,
      };
      data.map((teacherDetails) => {
        element.department = teacherDetails.department;
        if (teacherDetails) {
          element.count += teacherDetails.count;
          element.voice_total += teacherDetails.voice_total;
          element.speed_total += teacherDetails.voice_avg;
          element.Presentation_total += teacherDetails.Presentation_total;
          element.Communication_total += teacherDetails.Communication_total;
          element.Interest_total += teacherDetails.Interest_total;
          element.knowledge_total += teacherDetails.knowledge_total;
          element.assessible_total += teacherDetails.assessible_total;
          element.simulation_total += teacherDetails.simulation_total;
          element.encourage_total += teacherDetails.encourage_total;
          element.overall_total += teacherDetails.overall_total;
          element.voice_avg += teacherDetails.voice_avg;
          element.speed_avg += teacherDetails.speed_avg;
          element.Presentation_avg += teacherDetails.Presentation_avg;
          element.Communication_avg += teacherDetails.Communication_avg;
          element.Interest_avg += teacherDetails.Interest_avg;
          element.knowledge_avg += teacherDetails.knowledge_avg;
          element.assessible_avg += teacherDetails.assessible_avg;
          element.simulation_avg += teacherDetails.simulation_avg;
          element.encourage_avg += teacherDetails.encourage_avg;
          element.overall_avg += teacherDetails.overall_avg;
        }
      });
      // Push Calculated Data To Resuld array
      console.log(element);
      departmentWiseData.push(element);
    });
  });
  console.log(departmentWiseData);
});

router.get("/facultyreport", (req, res) => {
  res.render("faculty_wise_report/faculty_wise");
});

router.get("/editFaculty", (req, res) => {
  res.render("edit_faculty");
  Faculty.find({}, function (err, result) {
    result.map((e) => {
      const sem = e.semester;
      const dep = e.department;
      e.faculty.map((teacher) =>
        console.log(`${teacher}\t\t\t${sem}\t\t${dep}`)
      );
    });
  });
});

router.post("/facultyreport", (req, res) => {
  console.log(req.body.department);
  if (req.body.department == "CSE") {
    Feedback.find({ department: "CSE" }, function (err, result) {
      console.log(result);
      res.render("../views/faculty_wise_report/CSE.ejs", { record: result });
    });
  }

  if (req.body.department == "MECH") {
    Feedback.find({ department: "MECH" }, function (err, result) {
      console.log(result);
      res.render("../views/faculty_wise_report/mechanical.ejs", {
        record: result,
      });
    });
  }

  if (req.body.department == "it") {
    Feedback.find({ department: "IT" }, function (err, result) {
      console.log(result);
      res.render("../views/faculty_wise_report/IT.ejs", { record: result });
    });
  }

  if (req.body.department == "electronics") {
    Feedback.find({ department: "ECE" }, function (err, result) {
      console.log(result);
      res.render("../views/faculty_wise_report/electronics.ejs", {
        record: result,
      });
    });
  }

  if (req.body.department == "chemical") {
    Feedback.find({ department: "CHEM" }, function (err, result) {
      console.log(result);
      res.render("../views/faculty_wise_report/chemical.ejs", {
        record: result,
      });
    });
  }

  if (req.body.department == "civil") {
    Feedback.find({ department: "CIVIL" }, function (err, result) {
      console.log(result);
      res.render("../views/faculty_wise_report/civil.ejs", { record: result });
    });
  }

  if (req.body.department == "ipe") {
    Feedback.find({ department: "IPE" }, function (err, result) {
      console.log(result);
      res.render("../views/faculty_wise_report/IP.ejs", { record: result });
    });
  }
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
        sessionStorage.setItem("Department", department);
        // console.log(sessionStorage.getItem("Department"))
        res.status(201).json({ message: "User Registered Sucessfully" });
        res.redirect("/feedback");
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed To Register User" });
        console.log("error posting data :" + err);
      });
    console.log(sessionStorage.getItem("Department"));
  });
});

// feedback post api for feedback page
router.post("/feedback", (req, res,) => {
  var faculty_department = sessionStorage.getItem("Department")
  // console.log(req.body);
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
  
  Feedback.exists({Professor: req.body.Professor} , function(err,exist){
    if(exist==true){   
        
      Feedback.updateOne(
        { Professor : req.body.Professor },
        { 
            $inc:{ count:1,
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
            overall_total:req.body.overall
            },
            
          }
      ).then(()=> {
        console.log("data incremented successfully!!")
        
        }).catch((err) => {
        res.status(500).json({ error: "Failed To increment data" });
        console.log("error incrementing data :" + err);
        });

      Feedback.findOne({Professor : req.body.Professor}, function(err,data){
      
          var avg_voice = data.voice_total/data.count
          var avg_speed = data.speed_total/data.count
          var avg_Presentation = data.Presentation_total/data.count
          var avg_Communication = data.Communication_total/data.count
          var avg_Interest = data.Interest_total/data.count
          var avg_knowledge = data.knowledge_total/data.count
          var avg_assessible = data.assessible_total/data.count
          var avg_simulation = data.simulation_total/data.count
          var avg_encourage = data.encourage_total/data.count
          var avg_punctual = data.punctual_total/data.count
          var avg_overall = data.overall_total/data.count
           
          
        Feedback.updateOne(
        { Professor : req.body.Professor },
        {
          $set : {
                   voice_avg : avg_voice.toFixed(1),
                   speed_avg : avg_speed.toFixed(1),
                   Presentation_avg : avg_Presentation.toFixed(1),
                   Communication_avg : avg_Communication.toFixed(1),
                   Interest_avg : avg_Interest.toFixed(1),
                   knowledge_avg : avg_knowledge.toFixed(1),
                   assessible_avg : avg_assessible.toFixed(1),
                   simulation_avg : avg_simulation.toFixed(1),
                   encourage_avg : avg_encourage.toFixed(1),
                   punctual_avg : avg_punctual.toFixed(1),
                   overall_avg : avg_overall.toFixed(1),
        
                  }
        }  
      )
      .then(()=> {
        console.log("data avg successfully!!")
        // console.log(department)
        
        }).catch((err) => {
        res.status(500).json({ error: "Failed To avg data" });
        console.log("error incrementing data :" + err);
        });
      
      })

      
      
    }else{
      Feedback.create(
        { 
          Professor : req.body.Professor,
          department :faculty_department,
          count :1,
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
          
          voice_avg:req.body.voice,
          speed_avg:req.body.speed,
          Presentation_avg:req.body.Presentation,
          Communication_avg:req.body.Communication,
          Interest_avg:req.body.Interest,
          knowledge_avg:req.body.knowledge,
          assessible_avg:req.body.assessible,
          simulation_avg:req.body.simulation,
          encourage_avg:req.body.encourage,
          punctual_avg:req.body.puntual,
          overall_avg:req.body.overall,
        }
      ).then(()=> {
            console.log("data added successfully!!")
      }).catch((err) => {
            res.status(500).json({ error: "Failed To Register feedback" });
            console.log("error posting data :" + err);
        });

    }
  })
  
});

// Post Request for /editFaculty

// router.post("/editFaculty", (req, res) => {
//   //Post Request According to Edit form
//   console.log(req.body);
// });

// router.post("/addfaculty", (req, res) => {
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
