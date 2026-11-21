import {type SyntheticEvent, useState} from "react";
import {AuthInput} from "./AuthInput.tsx";
import {CheckboxField} from "./CheckboxField.tsx";

interface LoginFormProps {
    onSwitchToRegister: () => void;
    onSuccess: () => void;
    onForgotPassword?: () => void;
}

export const LoginForm = ({
                              onSwitchToRegister,
                              onSuccess,
                              onForgotPassword,
                          }: LoginFormProps) => {
    const [email, setEmail] = useState("");
    // Тимчасово прописані помилки для перевірки верстки; згодом підключаться валідатор / RTK Query
    const [emailError, setEmailError] = useState<string | undefined>("Невірний формат пошти",);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | undefined>("Невірний пароль",);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Тут буде твоя RTK Query мутація логіну
        onSuccess();
    };

    return (
        <div>
            <h2 className="text-center text-xl font-medium tracking-tight">
                Увійти до особистого кабінету
            </h2>

            {/* Болванка для входу через Google */}
            <button
                type="button"
                onClick={() => {
                    // TODO: логіка входу через Google
                }}
                className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center rounded-full border bg-white px-5 text-sm transition hover:bg-[#F3F1EC]"
            >
                Увійти через Google
            </button>

            <div className="my-3 text-center text-sm text-gray-700">або</div>

            <form onSubmit={handleSubmit} className="flex flex-col">
                <AuthInput
                    label="Електронна пошта"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(undefined);
                    }}
                    error={emailError}
                />

                <AuthInput
                    containerClassName="mt-4"
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError(undefined);
                    }}
                    error={passwordError}
                />

                {/* Шаблонна кнопка для відновлення пароля */}
                <div className="mt-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (onForgotPassword) {
                                onForgotPassword();
                            }
                            // TODO: відкриття відновлення пароля
                        }}
                        className="cursor-pointer text-xs text-gray-600 hover:text-gray-800 hover:underline"
                    >
                        Забули пароль?
                    </button>
                </div>

                <button
                    type="submit"
                    className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"
                >
                    Увійти
                </button>

                {/* Шаблонна кнопка запам'ятати мене */}
                <CheckboxField
                    containerClassName="mt-4"
                    label={<span>Запам&apos;ятати мене</span>}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />

                <p className="mt-6 text-center text-xs font-medium">
                    Немає облікового запису?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="cursor-pointer text-gray-600 transition hover:text-gray-800"
                    >
                        Зареєструватися
                    </button>
                </p>
            </form>
        </div>
    );
};