import {User} from '../../../../DB/models/User/User.model.js';
import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js';
import {registerValidation} from '../auth.validation.js';

export const register = asyncHandler(async (req, res, next)=>{

    const {error} =registerValidation.validate(req.body);
    if(error){
        return next(new AppError(error.details[0].message,400));
    }
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return next(new AppError('User already exists',400));
    }
    const newUser = await User.create({
        email,
        password,
    });
    res.status(201).json({
        status:'success',
        message:'User created successfully',
        user:{
            id:newUser._id,
            email:newUser.email,
            createdAt:newUser.createdAt,
        }
    })

})