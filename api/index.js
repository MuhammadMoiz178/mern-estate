import express from "express"
import dotenv from "dotenv"
import connectDb from "./connectDb.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
dotenv.config({
    path:"./.env"
})

connectDb()
const app = express()

app.use(express.json())

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.listen(8000,()=>console.log("Server is running on port 3009"))

