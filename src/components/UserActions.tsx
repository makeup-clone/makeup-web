import UserActionBtn from "./ui/UserActionBtn.tsx";
import { BadgeInfoIcon, ShoppingCart, User, Bell } from 'lucide-react';

const btns = [
    { key: '1',label: <User className={'text-white'}/> },
    { key: '2',label: <BadgeInfoIcon className={'text-white'}/> },
    { key: '3',label: <Bell className={'text-white'}/> },
    { key: '4',label: <ShoppingCart className={'text-white'}/> },
].reverse();

const UserActions = () => {
    return (
        <>
            <div className={"flex justify-end items-center space-x-4 w-full"}>
                {btns.map((btn) => (
                    <UserActionBtn key={btn.key}>
                        {btn.label}
                    </UserActionBtn>
                ))}
            </div>
        </>
    )
}

export default UserActions;