import {User} from '../../../../DB/models/User/User.model.js';
import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';

export const uploadProfilePicture = asyncHandler(async(req,res,next)=>{

        if(!req.file){
            return next(new AppError('Please upload a file',400))
        }
        const imagePath = `/uploads/${req.file.filename}`
        const user = await User.findByIdAndUpdate(req.user.sub,{profilePic:imagePath},{new:true}).select("-password -resetOTP")
        res.status(200).json({
            status:'Profile picture uploaded successfully',
            data:{
                user
            }
        })
})
        

