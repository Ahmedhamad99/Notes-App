import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import {verifyToken} from "../utils/jwt.js"
import AppError from '../utils/AppError.js';
import {RevokedToken} from "../../DB/models/Auth/RevokedToken.model.js"

export const auth = asyncHandler(async(req, res, next) => {
  const raw = req.headers["authorization"];
  const token = raw && raw.startsWith("Bearer ") ? raw.split(" ")[1] : null;

  if (!token) {
    return next(new AppError("Please login, you are not authorized",401));
  }

  // if (tokenBlacklist.includes(token)) {
  //   return next(new AppError("Token is blacklisted. Please login again", 401));
  // }

  try {
    
    const decoded = verifyToken(token);
    const revoked = await RevokedToken.findOne({ jti: decoded.jti });
    if (revoked) {
      return res.status(401).json({ message: "Token has been revoked" });
    }
    req.user = decoded;

    next();
  } catch (err) {
    return next(new AppError("Invalid token", 401));
  }
});

// Authorization Middleware
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to perform this action",403)
      );
    }
    next();
  };
};
