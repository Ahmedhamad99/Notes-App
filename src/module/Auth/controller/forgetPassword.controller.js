import {User} from '../../../../DB/models/User/User.model.js';
import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import crypto from "crypto";
import { sendEmail } from '../../../utils/mail.js';

export const forgotPassword = asyncHandler(async (req, res, next) => {
    
    const {email} = req.body;
    if(!email){
        return next(new AppError('Email is required', 400));
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(200).json({ message: "If this email exists, OTP has been sent" });;
    }

    // generate otp
    const otp = crypto.randomInt(100000, 999999);
    //save otp to 10 minutes 
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    

    await sendEmail({
        to:user.email.trim(),
        subject: 'Password Reset',
        text: `Your otp is ${otp}`
    });
    res.json({ message: "If this email exists, OTP has been sent" });



})
