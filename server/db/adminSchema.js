const mongoose= require("mongoose");

const adminSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    }
});

const Admin= mongoose.model("Admin",adminSchema);

module.exports= Admin;