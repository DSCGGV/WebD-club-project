const mongoose = require("mongoose");
const PORT =4000;
const DB = "mongodb+srv://shreyas:admin@cluster0.qtn96.mongodb.net/users?retryWrites=true&w=majority";
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


















  