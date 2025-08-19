
import bcrypt from "bcrypt";
import {User} from '../../../../DB/models/User/User.model.js';
import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';


export const resetPassword = asyncHandler(async (req, res, next) => {
    const {email,otp,newPassword} = req.body;

    if(!email || !otp || !newPassword)
    {
        return next(new AppError("Please provide all the required fields", 400))
    }
    const user = await User.findOne({email});
    if(!user || !user.resetOTP)
    {
        return next(new AppError("User not found", 404))
    }
    if(user.resetOTP !== otp || user.resetOTPExpiry < Date.now()){
        return next(new AppError("OTP is invalid or expired", 400))
    
    }
    
    user.password = newPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    await user.save();
    res.status(200).json({
        status: "success",
        message: "Password reset successfully"
});


});