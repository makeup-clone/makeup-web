import UserActionBtn from "./ui/UserActionBtn.tsx";
import { Heart } from 'lucide-react';
import {useAuthModal} from "../hooks/useAuthModal.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useProfileMenu} from "../hooks/useProfileMenu.ts";
import {ProfileMenu} from "./ProfileMenu.tsx";
import shoppingSrc from "../assets/shopping.svg";
import heartSrc from "../assets/heart.svg";
import profileSrc from "../assets/profile.svg";

const UserActions = () => {
    const { openLogin } = useAuthModal();
    const { isAuthenticated } = useAuth();
    const { toggleMenu } = useProfileMenu();

    const btns = [
        { key: '1',label: <div>
                <img src={profileSrc} draggable={false} alt="profile"/>
            </div>,
            onClick: () => {
                if (isAuthenticated)
                    toggleMenu();
                else
                    openLogin();
            }
        },
        { key: '2',label: <div>
                <img src={heartSrc} draggable={false} alt="heart"/>
            </div> },
        { key: '3',label: <div>
                <img src={shoppingSrc} draggable={false} alt="shopping"/>
            </div> },
        { key: '4',label: <Heart size='40'/> },
    ]

    return (
        <>
            <div className={"flex justify-end items-center space-x-4 w-full relative"}>
                {btns.map((btn) => (
                    btn.key === "1" ? (
                        <div key={btn.key} className="relative flex items-center">
                            <UserActionBtn onClick={btn.onClick}>
                                {btn.label}
                            </UserActionBtn>
                            <ProfileMenu/>
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