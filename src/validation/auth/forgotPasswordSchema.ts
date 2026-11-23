import {z} from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Введіть електронну пошту")
        .email("Некоректний формат електронної пошти"),
});