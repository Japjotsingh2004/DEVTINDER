const express = require("express");

const app=express();

const{ adminAuth, userAuth}=require("./middlewares/auth");

app.use("/admin",adminAuth);
app.use("/user",userAuth);

app.get("/user",(req,res)=>{
    res.send("user data sent");
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data send");
});
app.get("/admin/deleteUser",(req,res)=>{
    res.send("deleted a user");
});

app.listen(3000,()=>{
    console.log("server is started")
});