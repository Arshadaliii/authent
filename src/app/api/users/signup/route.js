import User from "@/models/model";
import bcrypt from 'bcryptjs'
import { sendMail } from "@/helpers/sendMail";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";




export async function POST(req) {
    connectDB();
   try {
     const reqBody = await  req.json()
     const { username,email, password } = reqBody
      
 
     const user = await User.findOne({email})
 
 
     if(user){
         return NextResponse.json({
             error: "User already exists",
             success: false
         })
        }
 
     const hashedPassword = await bcrypt.hash(password, 10)
 
     const newUser = new User({username, email, password: hashedPassword})
     const savedUser = await newUser.save()
 
 
     await sendMail({
         email,
         emailType: 'VERIFY',
         userId: savedUser._id
     })
 
     return Response.json({message: "usercreated successfully", status: 201, savedUser,  success: true})
   } catch (error) {
     return Response.json({error})
   }
}