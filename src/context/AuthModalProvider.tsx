import {type ReactNode, useCallback, useState} from "react";
import type {AuthModalMode} from "../types/auth.ts";
import {useNavigate} from "react-router";
import {AuthModalContext} from "./AuthModalContext.tsx";
import type {IAuthModalOptions} from "../interfaces/IAuthModalOptions.ts";

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<AuthModalMode>(null);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);
    const navigate = useNavigate();

    const openLogin = useCallback((options?: IAuthModalOptions) => {
        setRedirectTo(options?.redirectTo ?? null);
        setMode("login");
    }, []);

    const openRegister = useCallback((options?: IAuthModalOptions ) => {
        setRedirectTo(options?.redirectTo ?? null);
        setMode("register");
    }, []);

    const closeModal = useCallback(() => {
        setMode(null);
        setRedirectTo(null);
    }, []);

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