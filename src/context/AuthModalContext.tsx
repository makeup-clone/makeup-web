import {createContext} from "react";
import type {AuthModalMode} from "../types/auth.ts";
import type {IAuthModalOptions} from "../interfaces/IAuthModalOptions.ts";

interface AuthModalContextValue {
    mode: AuthModalMode;
    isOpen: boolean;
    openLogin: (options?: IAuthModalOptions) => void;
    openRegister: (options?: IAuthModalOptions) => void;
    closeModal: () => void;
    setMode: (mode: Exclude<AuthModalMode, null>) => void;
    authSuccess: () => void;
}

export const AuthModalContext = createContext<AuthModalContextValue | null>(null);