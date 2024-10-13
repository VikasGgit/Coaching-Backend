import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const Url=process.env.MONGO_URI;

export const connnect=async()=>{
    try{
        console.log(Url);
await mongoose.connect(Url, 
    console.log("db connection established"))
}
catch(e){console.log("db connection error",e.message);}
}