const mongoose=require("mongoose");
const userSchema=mongoose.schema({
  firstName:{
    type:String
  },
  lastName:{
    type:string
  },
  emailId:{
    type:string
  },
  password:{
    type:string
  }
});

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;



app.post("/signup",async(req,res)=>{
  const user=new user({
    firstName:"japjot",
    lastName:"singh",
    emailId:"japjot.com",
    password:"japjat123",
  });
  await user.save();
  res.send("user added successfully");
})