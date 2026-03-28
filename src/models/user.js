const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid") 
            }
        },
    },
    about:{
        type:String,
        default:"this is a default about of the user",
    },
    skills:{
        type:[String],
    },
},
{
    timestamps:true,
}
);

userSchema.methods.getJWT= async function () {
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEV@Tinder123",{
        expiresIn:"7d",
    });
    return token;
}

userSchema.methods.validatePassword=async function (passwordInputbyUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputbyUser,passwordHash);
    return isPasswordValid;
}

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;