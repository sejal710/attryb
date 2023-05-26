const express = require("express")
const  {userModel} = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register",async(req,res) => {
   const {name,email,password} = req.body;
   try{
    const user = new userModel({name,email,password});
    await user.save();
    res.send({Message: "Sucessfully Register"})
   }
   catch(e){
    res.send({Message:e.message})
   }
})

userRouter.post("/login",async(req,res) => {
    const {email,password} = req.body;
    try{
     const user = await userModel.find({email,password});
     if(user.length > 0){
        if(user[0].password === password){
            const token = jwt.sign({ userID:user[0]._id}, 'masai');
            res.json({Message:"Succesfully",ID:user[0]._id,token:token})
        }
        else{
            res.json({Message:"Wrong Password"})
        }
     }
     else{
        res.send("Make sure you are register")
     } 
    }
    catch(e){
     res.send({Message:e.message})
    }
 })

 userRouter.get("/getProfiles",async(req,res) => {
    try{
     const user = await userModel.find();
      res.send(user)
    }
    catch(e){
     res.send({Message:e.message})
    }
 })

module.exports= {userRouter}