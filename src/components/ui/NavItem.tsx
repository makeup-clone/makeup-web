import {NavLink} from "react-router";

interface NavItemProps {
    to: string;
    className?: string;
    children: React.ReactNode;
}

const NavItem = ({to, children, className}: NavItemProps) => {
    return (
        <>
            <NavLink
                to={to}
                className={({isActive}) =>
                    `p-2 text-sm font-medium transition-colors ${className} ${
                        isActive
                            ? 'text-gray-700'
                            : 'text-gray-900 hover:text-gray-700'
                    }`
                }
            >
                {children}
            </NavLink>
        </>
    )
}

export default NavItem;