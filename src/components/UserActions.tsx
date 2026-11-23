import UserActionBtn from "./ui/UserActionBtn.tsx";
import { Heart } from 'lucide-react';
import {useAuthModal} from "../hooks/useAuthModal.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useProfileMenu} from "../hooks/useProfileMenu.ts";
import {ProfileMenu} from "./ProfileMenu.tsx";
import shoppingSrc from "../assets/shopping.svg";
import heartSrc from "../assets/heart.svg";
import profileSrc from "../assets/profile.svg";
import {useRef} from "react";

const UserActions = () => {
    const { openLogin } = useAuthModal();
    const { isAuthenticated } = useAuth();
    const { toggleMenu } = useProfileMenu();
    const btnContainer = useRef<HTMLDivElement | null>(null);

    const btns = [
        { key: '1',label: <div>
                <img src={profileSrc} draggable={false} className="select-none" alt="profile"/>
            </div>,
            onClick: () => {
                if (isAuthenticated)
                    toggleMenu();
                else
                    openLogin();
            }
        },
        { key: '2',label: <div>
                <img src={heartSrc} draggable={false} className="select-none" alt="heart"/>
            </div> },
        { key: '3',label: <div>
                <img src={shoppingSrc} draggable={false} className="select-none" alt="shopping"/>
            </div> },
        { key: '4',label: <Heart size='35'/> },
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