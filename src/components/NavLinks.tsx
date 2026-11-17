import NavItem from "./ui/NavItem.tsx";

const navItems = [
    { to: '/', label: 'Головна' },
    { to: '/catalog', label: 'Каталог' },
    { to: '/about-us', label: 'Про нас', className: 'text-nowrap' },
    { to: '/contacts', label: 'Контакти' },
];

const NavLinks = () => {
    return (
        <>
            <nav className="flex justify-center items-center space-x-1 w-full">
                {navItems.map((item) => (
                    <NavItem key={item.to} to={item.to} className={item.className}>
                        {item.label}
                    </NavItem>
                ))}
            </nav>
        </>
    )
}

export default NavLinks;