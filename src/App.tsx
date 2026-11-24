import {Route, Routes} from "react-router";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Catalog from "./pages/Catalog.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Contacts from "./pages/Contacts.tsx";
import {AdminRoute, GuestRoute, PrivateRoute} from "./routes/RoutesGuard.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";
import {useAuth} from "./hooks/useAuth.ts";
import {useAuthModal} from "./hooks/useAuthModal.ts";
import {useLogoutMutation} from "./apis/authApi.ts";


function App() {
    const { user, isLoading } = useAuth();
    const { openForgotPassword } = useAuthModal();
    const [ logout ] = useLogoutMutation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>} />
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route path="/contacts" element={<Contacts/>} />

                    <Route element={<GuestRoute/>}>
                        {/*Захищений маршрут від авторизованих користувачів*/}
                    </Route>

                    <Route element={<PrivateRoute/>}>
                        {/*Захищений маршрут від неавторизованих користувачів*/}
                        <Route path="/catalog" element={<Catalog/>} />
                        <Route path="/profile" element={<Profile isLoading={isLoading}
                                                                 user={user}
                                                                 onOpenForgotPassword={openForgotPassword}
                                                                 onLogout={ async ()=> {
                                                                     await logout().unwrap();
                                                                 }
                        }/>} />
                    </Route>

                    <Route element={<AdminRoute/>}>
                        {/*Захищений маршрут від неавторизованих користувачів і тих хто НЕ містить роль - Адмін*/}
                    </Route>

                    <Route path="*" element={<NotFound/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
