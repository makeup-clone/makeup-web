import { Outlet} from "react-router";
import Header from "./Header.tsx";
import {AuthModal} from "./modal/AuthModal.tsx";

const Layout =()=> {
    return (
        <div className={"min-h-screen"}>
            <main className={"px-8 flex-1"}>
                <Header/>
                <Outlet />
                <AuthModal/>
            </main>
        </div>
    );
}

export default Layout;