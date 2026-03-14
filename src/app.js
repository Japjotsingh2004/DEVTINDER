const express = require("express");

const app=express();


app.use("/user",(req,res,next)=>{
    console.log("handling the route user 1");
    next();
},
(req,res,next)=>{
    console.log("handling the route server 2")
 //   res.send("2nd response");
 next();
},
(req,res)=>{
    console.log("handling the route server 2")
    res.send("2nd response");
},
)

app.listen(3000,()=>{
    console.log("server is started")
});