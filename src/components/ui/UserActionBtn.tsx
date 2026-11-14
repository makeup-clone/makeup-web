interface UserActionProps {
    children: React.ReactNode;
}

const UserActionBtn = ( {children}:UserActionProps ) => {
    return (
        <>
            <button className="w-10 h-10 bg-gray-400 hover:bg-gray-500 hover:cursor-pointer transition-colors flex items-center justify-center ">
                {children}
            </button>
        </>
    )
}

export default UserActionBtn;