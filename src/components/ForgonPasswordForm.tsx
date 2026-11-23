// import { type SyntheticEvent, useState } from "react";
// import { AuthInput } from "./ui/AuthInput.tsx";
// import {forgotPasswordSchema} from "../validation/auth/forgotPasswordSchema.ts";

interface ForgotPasswordFormProps {
    onBackToLogin: () => void;
}



export const ForgotPasswordForm = ({
                                       onBackToLogin,
                                   }: ForgotPasswordFormProps) => {
    // const [email, setEmail] = useState("");
    // const [error, setError] = useState<string | undefined>(undefined);
    // const [shakeKey, setShakeKey] = useState(0);
    //
    // const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //
    //     const result = forgotPasswordSchema.safeParse({ email });
    //
    //     if (!result.success) {
    //         setError(result.error.issues[0]?.message ?? "Перевірте email");
    //         setShakeKey((prev) => prev + 1);
    //         return;
    //     }
    //
    //     setError(undefined);
    //
    //     // TODO: підключити RTK Query мутацію запиту на відновлення пароля
    // };

    return (
        <div className="flex flex-1 flex-col">
            <h2 className="text-center text-xl font-medium tracking-tight">
                Згадай
            </h2>

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3KFqb-WzzQvlVuzFnB5GFk_aE-B-gxpoRYGlqZWjmzQ&s=10" alt="Згадай"/>
            
            {/*<h2 className="text-center text-xl font-medium tracking-tight">*/}
            {/*    Відновлення пароля*/}
            {/*</h2>*/}

            {/*<form*/}
            {/*    onSubmit={handleSubmit}*/}
            {/*    noValidate*/}
            {/*    className="mt-6 flex flex-1 flex-col"*/}
            {/*>*/}
            {/*    <AuthInput*/}
            {/*        label="Електронна пошта"*/}
            {/*        type="email"*/}
            {/*        autoComplete="email"*/}
            {/*        required*/}
            {/*        helperText={"Введіть електронну пошту, прив'язану до акаунту — ми підготуємо інструкцію для відновлення доступу."}*/}
            {/*        value={email}*/}
            {/*        onChange={(e) => {*/}
            {/*            setEmail(e.target.value);*/}
            {/*            if (error) setError(undefined);*/}
            {/*        }}*/}
            {/*        error={error}*/}
            {/*        shakeKey={shakeKey}*/}
            {/*    />*/}

            {/*    /!* Притискаємо основну кнопку сабміту до низу картки *!/*/}
            {/*    <button*/}
            {/*        type="submit"*/}
            {/*        className="mt-auto mb-10 flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"*/}
            {/*    >*/}
            {/*        Надіслати запит*/}
            {/*    </button>*/}
            {/*</form>*/}

            <div className="mt-4 text-center text-xs font-medium">
                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="cursor-pointer text-gray-600 transition hover:text-gray-800 hover:underline"
                >
                    Повернутися до входу
                </button>
            </div>
        </div>
    );
};