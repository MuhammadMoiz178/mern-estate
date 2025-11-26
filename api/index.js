import express from "express"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"
import userRouter from "./routes/user.route.js"

dotenv.config({
    path:"./.env"
})

connectDb()


const app = express()
app.use("/api/user",userRouter)


app.listen(3000,()=>console.log("Server is running on port 3000"))

