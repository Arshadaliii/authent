import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: [true] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  forgotPasswordOtp: String,
  forgotPasswordOtpExpiry: Date,
  verifyEmail: String,
  verifyEmailExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;
