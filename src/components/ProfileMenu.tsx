import {type RefObject, useEffect, useRef} from "react";
import { Link, useNavigate } from "react-router";
import { useLogoutMutation } from "../apis/authApi.ts";
import {useProfileMenu} from "../hooks/useProfileMenu.ts";

interface ProfileMenuProps {
    profilePath?: string;
    ref?: RefObject<HTMLDivElement | null> | null;
}

export const ProfileMenu = ({ profilePath = "/profile", ref }: ProfileMenuProps) => {
    const { isOpen, closeMenu } = useProfileMenu();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

    useEffect(() => {
        if (!isOpen) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                if (ref?.current && !ref.current.contains(e.target as Node))
                    closeMenu();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, closeMenu, ref]);

    if (!isOpen) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (err) {
            console.error("LOGOUT ERROR:", err);
        } finally {
            closeMenu();
            navigate("/", { replace: true });
        }
    };

    return (
        <div
            ref={menuRef}
            role="menu"
            className="font-manrope absolute right-0 top-full z-40 mt-2 w-52 rounded-xl border border-black/10 bg-white text-sm text-gray-800 shadow-md"
        >
            <Link
                to={profilePath}
                role="menuitem"
                onClick={closeMenu}
                className="block px-4 py-3.5 transition rounded-t-xl hover:bg-cream-light"
            >
                Особистий кабінет
            </Link>

            <div className="border-t border-black/10" />

            <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full cursor-pointer items-center rounded-b-xl justify-between px-4 py-3.5 text-left text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <span>{isLoggingOut ? "Виходимо..." : "Вийти"}</span>
            </button>
        </div>
    );
};