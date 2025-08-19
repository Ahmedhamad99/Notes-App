import mongoose from "mongoose";

const revokedTokenSchema = new mongoose.Schema(
  {
    jti: { type: String, required: true, unique: true },
    exp: { type: Number, required: true }, 
    reason: { type: String, default: "logout" },
  },
  { timestamps: true }
);

export const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);
