import mongoose, {Schema}  from "mongoose" //{ Schema } is using destructuring to import the Schema class specifically from the mongoose module. In this case, Schema is a named export from the mongoose module.
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type: String,
        required:true,
        trim:true,
        index: true
    },
    avatar: {
        type:String, // cloudinary url third party api to store images and use it.
        required:true
    },
    coverImage:{
        type:String, //cloudinary url
    },
    watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String //Long STring
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10) //10 means rounds , salts in the algorithm
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password) //this.password is encrypted saved pass in db
}

//Jwt tokens , jwt tokens have access to our database
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        //secret key
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        //algorithm
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id
        },
        //secret key
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        //algorithm
    )
}
export const User = mongoose.model("User",userSchema)