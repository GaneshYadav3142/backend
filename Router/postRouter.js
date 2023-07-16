const express=require("express")
const mongoose=require("mongoose")
const postModel = require("../Model/postModel")
const authMiddleware = require("../auth")
const postRouter=express.Router()


postRouter.post("/add",authMiddleware,async (req,res)=>{
    console.log(req.body)
    //const {title,content}=req.body
    try {
        const newUser=await postModel(req.body)
        newUser.save()
        res.status(200).send({msg:"Post created Successfully"})
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})



postRouter.get("/", async (req, res) => {
    const { title } = req.query;
    try {
      if(title){
        const books = await postModel.find({ userID: req.body.userID,title});
      res.status(200).send(books);
      }
      else{
        const books = await postModel.find({ userID: req.body.userID});
      res.status(200).send(books);
      }
    } catch (error) {
        res.status(400).send({error})
    }
  });


  postRouter.patch("/update/:id", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const id = req.params.id;
    try {
      const updatedpost=await postModel.findByIdAndUpdate(id, req.body);
      res.status(200).send(updatedpost);
    } catch (error) {
        res.status(400).send({error})
    }
  });


  postRouter.delete("/delete/:id", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const id = req.params.id;
    try {
      
      
          await postModel.findByIdAndDelete(id);
          res.status(200).send( {message:"post deleted"});
      
      } catch (error) {
      console.log(error);
    }
  });














module.exports=postRouter