import mongoose from 'mongoose';
import { models } from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 120, 
    },
  });

const OTP = models?.OTP || mongoose.model('OTP', otpSchema);

export default OTP;
