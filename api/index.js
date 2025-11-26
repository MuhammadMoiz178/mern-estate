import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"

dotenv.config({
    path:"./.env"
})
const app = express()

connectDb()

app.listen(3000,()=>console.log("Server is running on port 3000"))