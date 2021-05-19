const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);
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
        res.redirect("/adminlogin")
      }
    }


// we link the router files to make our route easy
const auth = require("./router/auth");

// routes
app
  .get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/html/index.html"));
  })
  .get("/register", auth)
  .post("/studentlogin", auth)
  .get("/feedback", auth)
  .post("/feedback", auth)
  .post("/addfaculty", auth)
  .get("/adminlogin",auth)
  .post("/adminlogin",auth)
  .get("/admin_dashboard",checkSession,  auth)
  .get("/departmentreport" ,checkSession, auth)
  .post("/departmentreport" ,checkSession, auth)
  .get("/facultyreport" ,checkSession, auth)
  .post("/facultyreport/facultycharts" ,checkSession, auth)
  .get("/editFaculty" ,checkSession,  auth)
  .post("/editFaculty" ,checkSession, auth)
  .get("/editFaculty/delete" ,checkSession, auth)
  .post("/facultylist" ,checkSession, auth)
  .get("/logout" , auth);


app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
