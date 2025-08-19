import {User} from '../../../../DB/models/User/User.model.js';
import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import {loginValidation} from '../auth.validation.js';
import bcrypt from "bcrypt";

import {signToken} from "../../../utils/jwt.js"

export const login = asyncHandler(async (req, res, next) => {
     
    const {error} = loginValidation.validate(req.body);
    if(error){
        return next(new AppError(error.details[0].message,400));
    }
    //we must not  show if email or password wrong
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('User not found',404));
    }
    
    // using compare in bcrypt to check if password correct or not after check on email
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
        return next(new AppError('Invalid credentials',400));
    }
    
    // preparing payload 
   const payload = {sub:user._id.toString(),email:user.email}


   const {token,jti} = signToken(payload);
   console.log(user)
   return res.status(200).json({
        status:"Login success",
        token_token:token,
        tokenType: "Bearer",
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        jti,
        user:{
            id:user._id,
            email:user.email
        }})

})