import {z} from 'zod';



export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(30, "Username must be less than 30 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
 
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    
})