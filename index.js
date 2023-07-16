const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const userData = require("./db")
const userRouter = require("./Router/userRouter")
const postRouter = require("./Router/postRouter")
const authMiddleware = require("./auth")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use(authMiddleware)
app.use("/posts",postRouter)








app.listen(8080,async()=>{
    try {
        userData()
        console.log("Connected")
    } catch (error) {
        console.log(err)
    }
})