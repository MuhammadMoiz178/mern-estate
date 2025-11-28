import {User} from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    // console.log(req.body)
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    await user.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.log("SIGNUP ERROR:", error);   
    next(error);
  }
};



export const signin = async (req,res,next) => {
      const {email,password} = req.body
      try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404,'User not found'))
         const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong credentials')) 
        //means user email and pass is correct and we are gonna generate token
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const newUser = await User.findById(validUser._id).select("-password")
        res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(newUser)  
      } catch (error) {
        next(error)
      }
}