// require('dotenv').config({path: './env'});
import dotenv from "dotenv"
import connecToDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connecToDB()