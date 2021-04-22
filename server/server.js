const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");

dotenv.config({ path: "./config.env" });

require("./db/connection");
const User = require("./db/userSchema");

app.use(express.json());

// we link the router files to make our route easy
app.use(require("./router/auth"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
