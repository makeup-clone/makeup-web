import { useEffect, useState } from "react";
import { useAuthModal } from "../../hooks/useAuthModal.ts";
import {AuthInput} from "../AuthInput.tsx";

export const AuthModal = () => {
    const { mode, isOpen, closeModal, setMode, authSuccess } = useAuthModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <AuthInput
                        containerClassName="mt-4"
                        className="autofill:shadow-[inset_0_0_0_1000px_#F3F1EC]"
                        label="Пароль"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-medium">
                            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <span className="flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] border-gray-800 bg-transparent transition-colors peer-checked:border-olive peer-checked:bg-olive peer-focus-visible:ring-2 peer-focus-visible:ring-olive/40">
                                    <svg
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        aria-hidden="true"
                                        className={`h-3.5 w-3.5 text-white transition-opacity ${
                                            rememberMe ? "opacity-100" : "opacity-0"
                                        }`}
                                    >
                                        <path
                                            d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </span>
                            <span>Запам&apos;ятати мене</span>
                        </label>
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