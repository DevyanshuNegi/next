import { Message } from "@/model/User";


export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessage?:boolean; // ? for optional
    messages?: Array<Message>;

    // this gives type safety and suggestions
}