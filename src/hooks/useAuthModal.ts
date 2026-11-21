import {useContext} from "react";
import {AuthModalContext} from "../context/AuthModalContext.tsx";

export const useAuthModal = () => {
    const ctx = useContext(AuthModalContext);
    if (!ctx) {
        throw new Error("useAuthModal must be used within AuthModalProvider");
    }
    return ctx;
};