const mongoose= require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

adminSchema.pre("save" ,async function(next){
    if(this.isModified("password")){
        console.log(`initial password: ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`hashed password: ${this.password}`);
    }
    
    next()
})

const Admin= mongoose.model("Admin",adminSchema);

module.exports= Admin;