import {useEffect} from "react";
import {useAuthModal} from "../../hooks/useAuthModal.ts";

export const AuthModal = () => {
    const { mode, isOpen, closeModal, setMode, authSuccess } = useAuthModal();

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

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
            >
                <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Закрити"
                    className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-900"
                >
                    ✕
                </button>

                <h2 className="text-center text-xl font-semibold text-neutral-900">
                    {isLogin ? "Увійти до особистого кабінету" : "Створити акаунт"}
                </h2>

                {/* Форма входу / реєстрації */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Тут буде твоя RTK Query мутація логіну або реєстрації
                        authSuccess();
                    }}
                    className="mt-5 flex flex-col gap-3"
                >
                    {!isLogin && (
                        <input
                            type="text"
                            required
                            placeholder="Ім'я"
                            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                        />
                    )}

                    <input
                        type="email"
                        required
                        placeholder="Електронна пошта"
                        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                    />

                    <input
                        type="password"
                        required
                        placeholder="Пароль"
                        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                    />

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-lg bg-neutral-900 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                    >
                        {isLogin ? "Увійти" : "Зареєструватися"}
                    </button>

                    <p className="mt-2 text-center text-xs text-neutral-600">
                        {isLogin ? (
                            <>
                                Немає облікового запису?{" "}
                                <button
                                    type="button"
                                    onClick={() => setMode("register")}
                                    className="font-medium text-neutral-900 underline"
                                >
                                    Зареєструватися
                                </button>
                            </>
                        ) : (
                            <>
                                Вже є обліковий запис?{" "}
                                <button
                                    type="button"
                                    onClick={() => setMode("login")}
                                    className="font-medium text-neutral-900 underline"
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