import {NavLink} from "react-router";

interface NavItemProps {
    to: string;
    children: React.ReactNode;
}

const NavItem = ({to, children}: NavItemProps) => {
    return (
        <>
            <NavLink
                to={to}
                className={({isActive}) =>
                    `p-2 text-sm font-medium transition-colors ${
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