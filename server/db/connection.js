const mongoose = require("mongoose");
const DB = process.env.DATABASE || "<database string here>";
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
