const express=require("express");
const authRouter=express.Router();
const{validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");

authRouter.post("/signup",async (req,res)=>{

    
    try{
        //validation of data
       validateSignUpData(req); 

       const{firstName,lastName,emailId,password}=req.body;
        //Encrypt the password
        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);

        //creating new instance of user model

        const user=new User({
            firstName,
            lastName,
            emailId,password:passwordHash,
        })
       await user.save();
       res.send("user added successfully");
    } catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
    });

authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("EmailId is not present in db");
        }

        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            //create a jwt token
           const token=await user.getJWT();
            
            //add the token to cookie and send response back to user
           res.cookie("token", token);

            res.send("login successfully");
        }
        else{
            throw new Error("passsword not corrected");
        }
    }catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
});
  
module.exports=authRouter;