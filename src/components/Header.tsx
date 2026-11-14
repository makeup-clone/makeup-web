import Logo from "./ui/Logo.tsx";
import SearchBar from "./ui/SearchBar.tsx";
import NavLinks from "./NavLinks.tsx";
import UserActions from "./UserActions.tsx";

const Header = () => {
    return (
        <>
            <header>
                <div className={"flex justify-around items-center py-4 border-b-2 border-gray-800"}>
                    <div className={" flex-1 pr-2 h-full"}>
                        <Logo/>
                    </div>
                    <div className={" flex justify-center items-center flex-4 px-2 h-14"}>
                        <SearchBar/>
                    </div>
                    <div className={" flex items-center flex-4 px-2 h-14"}>
                        <NavLinks/>
                    </div>
                    <div className={" flex justify-items-end flex-2 pl-2 h-14"}>
                        <UserActions/>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;