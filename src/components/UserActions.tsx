import UserActionBtn from "./ui/UserActionBtn.tsx";
import {useAuthModal} from "../hooks/useAuthModal.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useProfileMenu} from "../hooks/useProfileMenu.ts";
import {ProfileMenu} from "./ProfileMenu.tsx";
import {useRef} from "react";
import heart3Icon from "../assets/heart3-01.svg";
import profile3Icon from "../assets/profile3-01.svg";
import shopping3Icon from "../assets/shopping3-01.svg";
import heartIcon from "../assets/heart.svg";
import profileIcon from "../assets/profile.svg";
import shoppingIcon from "../assets/shopping.svg";

const UserActions = () => {
    const { openLogin } = useAuthModal();
    const { isAuthenticated } = useAuth();
    const { toggleMenu } = useProfileMenu();
    const btnContainer = useRef<HTMLDivElement | null>(null);

    const btns = [
        { key: '1',label: <div>
                <img src={profile3Icon} draggable={false} className="w-8 h-8 shrink-0" alt="profile3"/>
            </div>,
            onClick: () => {
                if (isAuthenticated)
                    toggleMenu();
                else
                    openLogin();
            }
        },
        { key: '2',label: <div>
                <img src={profileIcon} draggable={false} className="w-8 h-8 shrink-0" alt="profile"/>
            </div>,
            onClick: () => {
                if (isAuthenticated)
                    toggleMenu();
                else
                    openLogin();
            }
        },
        {
            key: '3', label: <div>
                <img src={heart3Icon} draggable={false} className="w-9 h-9 shrink-0" alt="heart3"/>
            </div>
        },
        {
            key: '4', label: <div>
                <img src={heartIcon} draggable={false} className="w-9 h-9 shrink-0" alt="heart"/>
            </div>
        },
        {
            key: '5', label: <div>
                <img src={shopping3Icon} draggable={false} className="w-9 h-9 shrink-0" alt="shopping3"/>
            </div>
        },
        {
            key: '6', label: <div>
                <img src={shoppingIcon} draggable={false} className="w-9 h-9 shrink-0" alt="shopping"/>
            </div>
        },
    ]

    return (
        <>
            <div className={"flex justify-end items-center space-x-4 w-full relative"}>
                {btns.map((btn) => (
                    btn.key === "1" ? (
                        <div ref={btnContainer} key={btn.key} className="relative flex items-center">
                            <UserActionBtn onClick={btn.onClick}>
                                {btn.label}
                            </UserActionBtn>
                            <ProfileMenu ref={btnContainer}/>
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