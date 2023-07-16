const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const passValidator = require("../Password_Middleware");
const userModel = require("../Model/userModel");
const blacklistModel = require("../Model/blacklistModel");
const userRouter=express.Router()


userRouter.post("/register",passValidator, async(req,res)=>{
try {
    const {name,email,password,skills,age}=req.body;
    const userExist=await userModel.findOne({email})
    if(userExist) {
        res.status(400).send("User Already Exist")
    }
    else{
    const newPassword= await bcrypt.hash(password,10)
    const user=await userModel.create({name,email,password:newPassword,skills,age});
    user.save();
    res.status(200).send({msg:"The new user has been registered",registeredUser:user})
    }
} catch (error) {
    res.status(400).send({error:"error"})
}
})


userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
try {
   
    const user=await userModel.findOne({email})
    console.log(user)
    if(user)  {
        const verify= await bcrypt.compare(password,user.password)
        console.log(verify)
        if(!verify) { 
            res.status(400).send("Incorrect password")
        }
        else{
        const token=jwt.sign({userID:user._id},"Combat",{expiresIn:"1d"})
        //const refreshToken=jwt.sign({course:"backend"},"Combat",{expiresIn:"15m"})
        res.status(200).send({token})
    }
    }
    else  {
        res.status(400).send({error:"User Not Found"})
    }
} catch (error) {
    res.status(400).send({error:"error"})
}
})


userRouter.get("/logout",async(req,res)=>{
try {
    const token=req.headers.authorization?.split(" ")[1]
    if(!token) res.status(400).send("Login First")
    const blacklist=await blacklistModel({token})
    blacklist.save()
    res.status(200).send()
} catch (error) {
    res.status(400).send({error:"error"})
}





})



















module.exports=userRouter