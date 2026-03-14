const express = require("express");

const app=express();


app.get("/user",(req,res)=>{
    res.send({firstName:"japjot",lastName:"singh"})
});

app.post("/user",(req,res)=>{
    res.send("data save successfully")
});

app.use("/test",(req,res)=>{
    console.log("hello from the server")
});



app.listen(3000,()=>{
    console.log("server is started")
});