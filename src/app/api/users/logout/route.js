import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies utility
import { connectDB } from "@/dbConfig/dbConfig";

export async function GET(req) {
    connectDB();

    try {
        const cookieStore = await  cookies(); // No need for `await`
        const token =  cookieStore.get("token"); // Fetch token directly

        if (!token) {
            // If token is not found
            return NextResponse.json({
                message: "Token not found. Logout unsuccessful.",
                success: false,
            }, { status: 400 });
        }

        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        });

        // Clear the token cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
