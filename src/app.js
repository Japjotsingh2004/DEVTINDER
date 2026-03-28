const express = require("express");
const connectDB=require("./config/database");
const app=express();
const cookieParser=require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestsRouter=require("./routes/request");



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestsRouter);



connectDB().then(()=>{
    console.log("database connection established");
    app.listen(7777,()=>{
        console.log("server is running successfully on port 7777");
        });
})
.catch((err)=>{
    console.log("database cannot be connected",err);
});