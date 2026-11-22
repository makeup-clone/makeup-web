import {type ReactNode, useCallback, useState} from "react";
import type {AuthModalMode} from "../types/auth.ts";
import {useNavigate} from "react-router";
import {AuthModalContext} from "./AuthModalContext.tsx";
import type {IAuthModalOptions} from "../interfaces/IAuthModalOptions.ts";

// Провайдер керує станом модалки авторизації/реєстрації та редиректом після успіху
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    // Поточний режим модалки ("login" | "register" | null); якщо null — модалка закрита
    const [mode, setMode] = useState<AuthModalMode>(null);

    // Куди перенаправити користувача після успішної авторизації/реєстрації
    const [redirectTo, setRedirectTo] = useState<string | null>(null);
    const navigate = useNavigate();

    // Відкриває модалку в режимі входу та зберігає опціональний шлях редиректу
    const openLogin = useCallback((options?: IAuthModalOptions) => {
        setRedirectTo(options?.redirectTo ?? null);
        setMode("login");
    }, []);

    // Відкриває модалку в режимі реєстрації та зберігає опціональний шлях редиректу
    const openRegister = useCallback((options?: IAuthModalOptions ) => {
        setRedirectTo(options?.redirectTo ?? null);
        setMode("register");
    }, []);

    // Закриває модалку і скидає збережений шлях редиректу
    const closeModal = useCallback(() => {
        setMode(null);
        setRedirectTo(null);
    }, []);

    // Завершує сценарій авторизації: ховає модалку, чистить redirectTo та робить навігацію, якщо задано target
    const authSuccess = useCallback(() => {
        const target = redirectTo;
        setMode(null);
        setRedirectTo(null);
        if (target) {
            navigate(target, { replace: true });
        }
    }, [redirectTo, navigate]);

    return (
        <AuthModalContext.Provider
            value={{
        mode,
            isOpen: mode !== null,
            openLogin,
            openRegister,
            closeModal,
            setMode,
            authSuccess,
    }}
>
    {children}
    </AuthModalContext.Provider>
);
};