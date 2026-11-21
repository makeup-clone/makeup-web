import UserActionBtn from "./ui/UserActionBtn.tsx";
import { BadgeInfoIcon, ShoppingCart, User, Bell } from 'lucide-react';
import {useAuthModal} from "../hooks/useAuthModal.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useNavigate} from "react-router";

const UserActions = () => {
    const { openLogin } = useAuthModal();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const btns = [
        { key: '1',label: <User className={'text-white'}/>, onClick: () => {
                if (isAuthenticated)
                    navigate('/profile');
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
            <div className={"flex justify-end items-center space-x-4 w-full"}>
                {btns.map((btn) => (
                    <UserActionBtn key={btn.key} onClick={btn.onClick}>
                        {btn.label}
                    </UserActionBtn>
                ))}
            </div>
        </>
    )
}

export default UserActions;