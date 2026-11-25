import {type MouseEvent, useEffect, useRef} from "react";
import { useAuthModal } from "../../hooks/useAuthModal.ts";
import {LoginForm} from "../LoginForm.tsx";
import {RegisterFlow} from "../RegisterFlow.tsx";
import {ForgotPasswordForm} from "../ForgonPasswordForm.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

export const AuthModal = () => {
    // Стан модалки та дії керування нею з хука авторизації
    const { mode, isOpen, closeModal, setMode, authSuccess } = useAuthModal();
    const { isAuthenticated, isLoading } = useAuth();

    // Ref на темний фон та прапорець, чи натискання почалося саме на фоні (щоб не закривати модалку при drag-виділенні тексту зсередини)
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const mouseDownOnBackdropRef = useRef(false);

    useEffect(() => {
        if (isOpen && !isLoading && isAuthenticated && mode !== 'register') {
            authSuccess();
        }
    }, [isOpen, isLoading, isAuthenticated, authSuccess, mode]);

    // Закриваємо модалку по Escape, коли вона відкрита
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

    // Не рендеримо модалку, якщо вона закрита або не задано режим
    if (!isOpen || !mode) {
        return null;
    }

    // Фіксуємо успішну авторизацію/реєстрацію та закриваємо модалку
    const handleAuthComplete = () => {
        authSuccess();
        closeModal();
    };

    // Фіксуємо, чи mousedown стався безпосередньо на backdrop
    const handleBackdropMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        mouseDownOnBackdropRef.current = e.target === backdropRef.current;
    };

    // Закриваємо модалку лише якщо і mousedown, і mouseup відбулися на самому backdrop
    const handleBackdropMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        const isSameBackdrop =
            mouseDownOnBackdropRef.current && e.target === backdropRef.current;

        mouseDownOnBackdropRef.current = false;

        if (isSameBackdrop) {
            closeModal();
        }
    };

    return (
        // Затемнений оверлей модального вікна
        <div
            ref={backdropRef}
            onMouseDown={handleBackdropMouseDown}
            onMouseUp={handleBackdropMouseUp}
            className="font-manrope fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-[1px]"
        >
            {/* Контейнер картки авторизації/реєстрації */}
            <div
                className="relative flex overflow-y-auto scrollbar-none h-137.5 w-full max-w-110 flex-col bg-white px-10 py-9 shadow-sm"
            >
                {/* Кнопка закриття модалки */}
                <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Закрити"
                    className="absolute select-none right-4 top-4 px-2 py-1 text-sm text-gray-500 transition hover:text-gray-800 hover:cursor-pointer"
                >
                    ✕
                </button>

                {/* Перемикання між формою входу та багатоетапною реєстрацією */}
                {mode === "login" && (
                    <LoginForm
                        onSwitchToRegister={() => setMode("register")}
                        onForgotPassword={() => setMode("forgot-password")}
                    />
                )}

                {mode === "register" && (
                    <RegisterFlow
                        onSwitchToLogin={() => setMode("login")}
                        onSuccess={handleAuthComplete}
                    />
                )}

                {mode === "forgot-password" && (
                    <ForgotPasswordForm
                        onBackToLogin={() => setMode("login")}
                    />
                )}
            </div>
        </div>
    );
};