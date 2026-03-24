const express = require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");


app.use(express.json());


app.post("/signup",async (req,res)=>{

    const user=new User(req.body);
    try{
       await user.save();
       res.send("user added successfully");
    } catch(err){
        res.status(400).send("error saving the user:"+err.message);
    }
    });


app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
   try{
      const user=await User.find({emailId:userEmail});
      res.send(user);
   }catch(err){
    res.status(400).send("something went wrong");
   }
    
});


app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("spmething went wrong");
    }
});

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
 res.status(400).send("spmething went wrong");
    }
});

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        await user.findByIdAndDelete({_id:userId,data});
    }catch(err){
        res.status(400).send("something went wrong");
    }
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