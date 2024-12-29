import User from "@/models/model";
import bcrypt from 'bcryptjs'
import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { userschema } from "@/validationSchemas";



export async function POST(req) {
    connectDB();
   try {
     const reqBody = await req.json()
     const {email, password} = reqBody
 
     const user = await User.findOne({email})
     if (!user) {
         return Response.json({
             message: "User does not exists"
         })
     }
 
     const token = await jwt.sign(
        { id: user._id},
         process.env.TOKEN_SECRET,
         {expiresIn: '18d'}
     )
 
     const validPassword = await bcrypt.compare(password, user.password)
     if (!validPassword) {
         return Response.json({message: "incorrect password"})
     }
 
     const response = NextResponse.json({
         message: "user loged in successfully",
         success: true
     })
 
     response.cookies.set("token", token, {
         httpOnly: true,
         secure: true
     })
 
     return response
   } catch (error) {
    return Response.json({error, success: false})
   }

}