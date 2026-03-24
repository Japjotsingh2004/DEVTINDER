const express = require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");


app.post("/signup",async (req,res)=>{
//    console.log("Signup API called");
    const user=new User({
        firstName:"virat",
        lastName:"kohli",
        emailId:"virat@gmail.com",
        password:"virat123"
    });

   await user.save();
   res.send("user added successfully");
})



connectDB().then(()=>{
    console.log("database connection established");
    app.listen(7777,()=>{
        console.log("server is running successfully on port 7777");
        });
})
.catch((err)=>{
    console.log("database cannot be connected",err);
});