import User from '@/models/model'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'


export async function GET(request){
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value || ''
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        const user = await User.findById(decodedToken.id).select("-password")
    

        return Response.json(user)
    } catch (error) {
        return Response.json({error})
    }
}