import { useEffect, useState } from "react";
import { useAuthModal } from "../../hooks/useAuthModal.ts";
import {AuthInput} from "../AuthInput.tsx";
import {CheckboxField} from "../CheckboxField.tsx";

export const AuthModal = () => {
    const { mode, isOpen, closeModal, setMode, authSuccess } = useAuthModal();
    const [email, setEmail] = useState("");
    // поки, що помилки на стадії розробки і повядять себе місцями не коректно, але для нагдядного бачення, помилки зарання прописані
    const [emailError, setEmailError] = useState<string | undefined>("Невірний формат пошти");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | undefined>("Невірний пароль");
    const [name, setName] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeModal]);

    if (!isOpen || !mode) {
        return null;
    }

    const isLogin = mode === "login";

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setRememberMe(false);
    };

    const handleClose = () => {
        resetForm();
        closeModal();
    };

    const handleModeSwitch = (nextMode: "login" | "register") => {
        resetForm();
        setMode(nextMode);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Тут буде твоя RTK Query мутація логіну або реєстрації
        authSuccess();
    };

    return (
        <div
            onClick={handleClose}
            className="font-manrope fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-[1px]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[440px] bg-white px-10 py-9 shadow-sm"
            >
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Закрити"
                    className="absolute right-4 top-4 px-2 py-1 text-sm text-gray-500 transition hover:text-gray-800"
                >
                    ✕
                </button>

                <h2 className="text-center text-xl font-medium tracking-tight text-[#1A1A18]">
                    {isLogin ? "Увійти до особистого кабінету" : "Створити акаунт"}
                </h2>

                {/* Болванка для входу через Google */}
                <button
                    type="button"
                    onClick={() => {
                        // TODO: логіка входу через Google
                    }}
                    className="mt-6 flex h-11 w-full items-center justify-center rounded-full border bg-white px-5 text-sm transition hover:bg-[#F3F1EC] hover:cursor-pointer"
                >
                    Увійти через Google
                </button>

                <div className="my-3 text-center text-sm text-gray-700">або</div>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    {!isLogin && (
                        <AuthInput
                            containerClassName="mb-4"
                            label="Ім'я"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}

                    <AuthInput
                        label="Електронна пошта"
                        className="autofill:shadow-[inset_0_0_0_1000px_#F3F1EC]"
                        type="email"
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
                        className="autofill:shadow-[inset_0_0_0_1000px_#F3F1EC]"
                        label="Пароль"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError) setPasswordError(undefined);
                        }}
                        error={passwordError}
                    />

                    {/*Шаблонна кнопка для відновлення пароля*/}
                    {isLogin && (
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: відкриття відновлення пароля
                                }}
                                className="text-xs text-gray-600 hover:text-gray-800 hover:underline hover:cursor-pointer"
                            >
                                Забули пароль?
                            </button>
                        </div>
                    )}


                    <button
                        type="submit"
                        className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-olive px-5 text-sm text-white font-medium transition hover:bg-olive-600 hover:cursor-pointer"
                    >
                        {isLogin ? "Увійти" : "Зареєструватися"}
                    </button>

                    {/*Шаблонна кнопка запам'ятати мене*/}
                    {isLogin && (
                        <CheckboxField
                            containerClassName="mt-4"
                            label={<span>Запам&apos;ятати мене</span>}
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    )}


                    <p className="mt-6 text-center text-xs font-medium">
                        {isLogin ? (
                            <>
                                Немає облікового запису?{" "}
                                <button
                                    type="button"
                                    onClick={() => handleModeSwitch("register")}
                                    className="text-gray-600 transition hover:text-gray-800 hover:cursor-pointer"
                                >
                                    Зареєструватися
                                </button>
                            </>
                        ) : (
                            <>
                                Вже є обліковий запис?{" "}
                                <button
                                    type="button"
                                    onClick={() => handleModeSwitch("login")}
                                    className="text-gray-600 transition hover:text-gray-800 hover:cursor-pointer"
                                >
                                    Увійти
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};