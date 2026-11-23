import UserActionBtn from "./ui/UserActionBtn.tsx";
import { BadgeInfoIcon, ShoppingCart, User, Bell } from 'lucide-react';
import {useAuthModal} from "../hooks/useAuthModal.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useProfileMenu} from "../hooks/useProfileMenu.ts";
import {ProfileMenu} from "./ProfileMenu.tsx";

const UserActions = () => {
    const { openLogin } = useAuthModal();
    const { isAuthenticated } = useAuth();
    const { toggleMenu } = useProfileMenu();

    const btns = [
        { key: '1',label: <User className={'text-white'}/>, onClick: () => {
                if (isAuthenticated)
                    toggleMenu();
                else
                    openLogin();
            }
        },
        { key: '2',label: <BadgeInfoIcon className={'text-white'}/> },
        { key: '3',label: <Bell className={'text-white'}/> },
        { key: '4',label: <ShoppingCart className={'text-white'}/> },
    ].reverse();

    return (
        <>
            <div className={"flex justify-end items-center space-x-4 w-full relative"}>
                {btns.map((btn) => (
                    btn.key === "1" ? (
                        <div key={btn.key} className="relative flex items-center">
                            <UserActionBtn onClick={btn.onClick}>
                                {btn.label}
                            </UserActionBtn>
                            <ProfileMenu />
                        </div>
                    ) : (
                        <UserActionBtn key={btn.key} onClick={btn.onClick}>
                            {btn.label}
                        </UserActionBtn>
                    )
                ))}

                {/*<ProfileMenu/>*/}
            </div>
        </>
    )
}

export default UserActions;