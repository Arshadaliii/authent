import {z} from 'zod'
export const userschema = z.object({
    username: z.string()
                .min(4,{message: 'username have must be 4 charecters'})
                .max(20,{message: 'username should not longer than 20 charecters'})
                .trim(),
    email: z.string()
            .email({message: "enter a valid email"}),
    password: z.string()
                .min(6,{message: 'password must be of minimum 6 character'})  
                .max(20,{message: 'password should not longer than 20 charecters'})  
                .trim()
})
