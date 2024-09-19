import { Resend } from "resend";


import VerificationEmail from "../../emails/verificationEmail";

 import  {ApiResponse} from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

 export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
 ): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        return { success: true, message: " verification email send successfully" };
    } catch (error) {
        console.error("Error sending verification email", error);
        return {success: false, message: "Error sending verification email"};
    }
 }