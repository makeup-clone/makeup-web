import {z} from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Введіть електронну пошту")
        .email("Невірний формат пошти"),
    password: z
        .string()
        .min(1, "Введіть пароль"),
});