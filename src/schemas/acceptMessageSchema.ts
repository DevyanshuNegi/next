import {z} from "zod";

export const acceptMessageSchema = z.object({
    content: z
    .string()
    .min(1, "Message must be at least 1 characters long")
    .max(1000, "Message must be less than 1000 characters long")
})