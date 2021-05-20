const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);
const sessionStorage = require("node-sessionstorage");
const app = express();
const path = require("path");
const ejs = require("ejs");

// set view engine
app.set("view engine", "ejs");

// including .env file which includes DB string
dotenv.config({ path: "../config.env" });

require("./db/connection");
const PORT = process.env.PORT || 5000;

// session store in database
const store = new MongoDBSession({
  uri : process.env.DATABASE,
  collection : "admins",//storing session in "admin" collection
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// loading static assets
app.use("/css", express.static(path.resolve(__dirname, "../public/css")));
app.use("/images", express.static(path.resolve(__dirname, "../public/images")));
app.use("/js", express.static(path.resolve(__dirname, "../public/js")));

// session config
app.use(
  session({
    secret : "secret-key",
    resave : false,
    saveUninitialized : false,
    store : store,
    cookie:{
      maxAge:24*60*60*1000,//maxage:1day
    }
      
  })
)
// session checker middleware
const checkSession = (req,res,next) => {
      if(req.session.isAuth)
      {
        next()
      }else{
        res.redirect("/")
      }
    }

// restricting access acc. to user
const restrictAccess = (req,res,next) => {
  const userRole = sessionStorage.getItem("userRole")
  if(userRole == "admin"){
    next();
  }else{
    console.log("User unathorized to access webpage");
  }
}

// we link the router files to make our route easy
const auth = require("./router/auth");

// routes
app
  .get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/html/index.html"));
  })
  .get("/register", (req,res,next) =>{
    sessionStorage.setItem("userRole" , req.query.user)
    next();
  }, auth)
  .post("/studentlogin", auth)
  .get("/feedback", auth)
  .post("/feedback", auth)
  .post("/addfaculty",[ restrictAccess ,checkSession ], auth)
  .get("/adminlogin",auth)
  .post("/adminlogin",auth)
  .get("/adminDashboard",[ restrictAccess ,checkSession ],  auth)
  .get("/departmentreport" ,[ restrictAccess ,checkSession ], auth)
  .post("/departmentreport" ,[ restrictAccess ,checkSession ], auth)
  .get("/facultyreport" ,[ restrictAccess ,checkSession ], auth)
  .post("/facultyreport/facultycharts" ,[ restrictAccess ,checkSession ], auth)
  .get("/editFaculty" ,[ restrictAccess ,checkSession ],  auth)
  .post("/editFaculty" ,[ restrictAccess ,checkSession ], auth)
  .get("/editFaculty/delete" ,[ restrictAccess ,checkSession ], auth)
  .post("/facultylist" ,[ restrictAccess ,checkSession ], auth)
  .get("/logout" , auth);


app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
