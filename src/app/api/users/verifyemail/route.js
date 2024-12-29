import User from "@/models/model";

import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";



export async function POST(req) {
    connectDB();

    const reqBody = await req.json()
    const {token} = reqBody

    const user = await User.findOne({
        verifyEmail: token,
        verifyEmailExpiry: { $gt: Date.now() }
      });

      if (!user) {
        return NextResponse.json({ message: "invalid token" });
      }

      user.verifyEmail = undefined
      user.verifyEmailExpiry = undefined
      user.isVerified = true

      await user.save()

      return Response.json({message: "User verified successfully"})

}