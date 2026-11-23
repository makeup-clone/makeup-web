import {useContext} from "react";
import {ProfileMenuContext} from "../context/ProfileMenuContext.ts";

export const useProfileMenu = () => {
    const ctx = useContext(ProfileMenuContext);
    if (!ctx) {
        throw new Error("useProfileMenu must be used within a ProfileMenuProvider");
    }
    return ctx;
};