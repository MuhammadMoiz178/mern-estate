import {User} from "../models/user.model.js"
import bcrpytjs from "bcryptjs"

export const signup =async(req,res) => { 
    const {username,email,password} = req.body
    const hashedPassword = bcrpytjs.hashSync(password,10)
    const user = new User({username,email,password:hashedPassword})
    try {
        await user.save()
        res
        .status(201)
        .json("User created Successfully")
    } catch (error) {
        res.
        status(500)
        .json(error.message)
    }
   
}