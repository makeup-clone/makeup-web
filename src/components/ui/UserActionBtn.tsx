interface UserActionProps {
    children: React.ReactNode,
    onClick?: () => void,
}

const UserActionBtn = ( {children, onClick}:UserActionProps ) => {
    return (
        <>
            <button onClick={onClick} className="w-10 h-10 bg-olive hover:bg-olive-600 hover:cursor-pointer transition-colors flex items-center justify-center ">
                {children}
            </button>
        </>
    )
}

export default UserActionBtn;