import { Outlet} from "react-router";
import Header from "./Header.tsx";

const Layout =()=> {
    return (
        <div className={"min-h-screen"}>
            <main className={"px-8 flex-1"}>
                <Header/>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;