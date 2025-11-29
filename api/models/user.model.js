import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
      type:String,
      default:"data:image/png;base64,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",
      
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)