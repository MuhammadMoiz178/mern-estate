import mongoose from "mongoose";
import dotenv from "dotenv";



const connectDb=async ()=>{
    try {
        dotenv.config();
        // console.log(process.env.MONGODB_URI)
    const connectionInstance=await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`);
    
    } catch (error) {
        console.log("MongoDb error",error);
        process.exit(1)
    }
}

export default connectDb