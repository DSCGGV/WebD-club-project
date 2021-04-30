const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const DB = process.env.DATABASE || "mongodb://localhost:27017/feedback";
console.log(`Database URI String ${DB}`);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connnection successful`);
  })
  .catch((err) => console.log(`connection error: ${err}`));
