import {z} from "zod";

export const step1Schema = z.object({
    firstName: z.string().trim().min(1, "Введіть ім'я"),
    lastName: z.string().trim().min(1, "Введіть прізвище"),
    email: z
        .string()
        .trim()
        .min(1, "Введіть електронну пошту")
        .email("Невірний формат пошти"),
})

export const step2Schema = z
    .object({
        password: z
            .string()
            .min(1, "Створіть пароль")
            .min(8, "Мінімум 8 символів"),
        confirmPassword: z.string().min(1, "Підтвердіть пароль"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Паролі не збігаються",
        path: ["confirmPassword"], // куди саме прив'язати цю помилку
    });

export const step3Schema = z.object({
    acceptTerms: z.literal(true, {
        message: "Необхідно погодитися з умовами використання",
    }),
    acceptPersonalData: z.literal(true, {
        message: "Необхідно надати згоду на обробку персональних даних",
    }),
});