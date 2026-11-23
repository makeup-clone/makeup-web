import {type ReactNode, useCallback, useState} from "react";
import {ProfileMenuContext} from "./ProfileMenuContext.ts";

export const ProfileMenuProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = useCallback(() => setIsOpen(true), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);
    const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

    return (
        <ProfileMenuContext.Provider
            value={{ isOpen, openMenu, closeMenu, toggleMenu }}
        >
            {children}
        </ProfileMenuContext.Provider>
    );
};