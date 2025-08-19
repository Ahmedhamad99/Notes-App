import {RevokedToken} from "../../../../DB/models/Auth/RevokedToken.model.js";


import {verifyToken} from "../../../utils/jwt.js"

import { asyncHandler} from '../../../utils/asyncHandler.js';
import AppError from '../../../utils/AppError.js'

const logout = asyncHandler(async (req,res,next)=>{
     const raw = req.headers["authorization"];
     const token = raw && raw.startsWith("Bearer ") ? raw.split(" ")[1] : null;
     const decoded = verifyToken(token);
     
    console.log(decoded)
    const revoked = new RevokedToken({
        jti:decoded.jti,
        exp:decoded.exp
    })

    await revoked.save();

    res.status(200).json({
        status:"success",
        message:"Logout Successfully"})

})

export default logout;