// require('dotenv').config({path: './env'});
import dotenv from "dotenv"
import connecToDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connecToDB() //async function will return response so now using .then and .catch
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error: ",error);
        throw error
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`App running at port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed",err);
})