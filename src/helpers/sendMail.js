import nodemailer from "nodemailer";
import User from "@/models/model.js";
import bcrypt from "bcryptjs";


export const sendMail = async ({ email, emailType, userId }) => {
  const token = await bcrypt.hash(userId.toString(), 10);
  const OTP = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
  const verifyEmail = `<p>Click <a href=${process.env.DOMAIN}/verifytoken?token=${token}>here</a> to verify your email
                         <br>or visit the below link
                         <br>http://localhost:3000/verifytoken?token=${token} </p>`;

  const verifyOTP = `<p>Click <a href=${process.env.DOMAIN}/verifyotp?otp=${OTP}>here</a> to verify your email
                         <br>or visit the below link
                         <br>http://localhost:3000/verifyotp?otp=${OTP} </p>`;

  if (emailType === "VERIFY") {
    await User.findByIdAndUpdate(userId, {
      $set: { verifyEmail: token, verifyEmailExpiry: Date.now() + 360000 },
    });
  } else if (emailType === "FORGOT") {
    await User.findByIdAndUpdate(userId, {
      $set: {
        forgotPasswordOtp: OTP,
        forgotPasswordOtpExpiry: Date.now() + 360000,
      },
    });
  }

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "866df86f7e9d87",
      pass: "ff2b54b9e6cbec"
    }
  });

  const mailOption = {
    from: 'arshad.io', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: emailType === 'VERIFY' ? "Email verification": "OTP verification", // plain text body
    html: emailType === 'VERIFY'? verifyEmail : verifyOTP , // html body
  };

  const mailResponse = await transport.sendMail(mailOption)
  return mailResponse

};
