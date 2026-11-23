interface UserActionProps {
    children: React.ReactNode,
    onClick?: () => void,
}

// const hoverStyle1 = "hover:border-gray-900 border-b py-1 border-transparent transition-colors duration-200";
const hoverStyle2 = "hover:bg-cream-light rounded p-1 transition-colors duration-200";

const UserActionBtn = ( {children, onClick}:UserActionProps ) => {
    return (
        <>
            <button onClick={onClick} className={`w-10 h-10 cursor-pointer flex items-center justify-center ${hoverStyle2}`}>
                {children}
            </button>
        </>
    )
}

export default UserActionBtn;