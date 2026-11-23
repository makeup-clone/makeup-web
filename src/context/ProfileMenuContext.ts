import {createContext} from "react";

interface ProfileMenuContextValue {
    isOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
}

export const ProfileMenuContext = createContext<ProfileMenuContextValue | null>(null);