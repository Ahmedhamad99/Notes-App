import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:6
    },
    profilePic:{
        type:String,
        default:null
    },
    resetOTP:{
        type:String,
        default:null
    },
    resetOTPExpiry: { type: Date, default: null }


},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
}
)

export  const User = mongoose.model("User",userSchema);