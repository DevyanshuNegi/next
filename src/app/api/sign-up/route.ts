import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

sendVerificationEmail


export async function POST(request: Request) {
    await dbConnect();

    try {
        const {username, email, password} = await request.json();
        const existingUserVerifiedByusername = await UserModel.findOne({
            username, 
            isVerified: true
        })

        if(existingUserVerifiedByusername) {
            return Response.json({
                success: false,
                message: "useranme is taken already"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email});

        const verifyCode = (Math.floor((100000 + Math.random() * 900000)).toString())

        if(existingUserByEmail) {
            true // TODO: Back here  
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            // this is const object but members inside it can be modified due to new keyword
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1);

            new UserModel({
                username, 
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if(emailResponse.success) {
            return Response.json({
                
                success: true,
                message: "registering user successfully, Please verify your email"
                
            }, {status:201})
        }

    } catch (error) {
        console.error("Error signing up", error);
        return Response.json(
            {
                success: false,
                message : "error registering user"
            },
            {
                status: 500,
            }
        )
    }
}