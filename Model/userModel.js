const { default: mongoose, mongo } = require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    skills:String,
    age:Number
})

const userModel=mongoose.model("CombatX",userSchema)

module.exports=userModel