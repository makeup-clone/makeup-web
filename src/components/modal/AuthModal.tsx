import {type MouseEvent, useEffect, useRef} from "react";
import { useAuthModal } from "../../hooks/useAuthModal.ts";
import {LoginForm} from "../LoginForm.tsx";
import {RegisterFlow} from "../RegisterFlow.tsx";

export const AuthModal = () => {
    const { mode, isOpen, closeModal, setMode, authSuccess } = useAuthModal();
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const mouseDownOnBackdropRef = useRef(false);

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

    const handleAuthComplete = () => {
        authSuccess();
        closeModal();
    };

    const handleBackdropMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        mouseDownOnBackdropRef.current = e.target === backdropRef.current;
    };

    const handleBackdropMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        const isSameBackdrop =
            mouseDownOnBackdropRef.current && e.target === backdropRef.current;

        mouseDownOnBackdropRef.current = false;

        if (isSameBackdrop) {
            closeModal();
        }
    };

    return (
        <div
            ref={backdropRef}
            onMouseDown={handleBackdropMouseDown}
            onMouseUp={handleBackdropMouseUp}
            className="font-manrope fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-[1px]"
        >
            <div
                className="relative flex min-h-[540px] w-full max-w-[440px] flex-col bg-white px-10 py-9 shadow-sm"
            >
                <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Закрити"
                    className="absolute right-4 top-4 px-2 py-1 text-sm text-gray-500 transition hover:text-gray-800 hover:cursor-pointer"
                >
                    ✕
                </button>

                {mode === "login" && (
                    <LoginForm
                        onSwitchToRegister={() => setMode("register")}
                        onSuccess={handleAuthComplete}
                    />
                )}

                {mode === "register" && (
                    <RegisterFlow
                        onSwitchToLogin={() => setMode("login")}
                        onComplete={handleAuthComplete}
                    />
                )}
            </div>
        </div>
    );
};