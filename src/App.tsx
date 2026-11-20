import {Route, Routes} from "react-router";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Catalog from "./pages/Catalog.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Contacts from "./pages/Contacts.tsx";
import {AdminRoute, GuestRoute, PrivateRoute} from "./routes/RoutesGuard.tsx";
import NotFound from "./pages/NotFound.tsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>} />
                    <Route path="/catalog" element={<Catalog/>} />
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route path="/contacts" element={<Contacts/>} />

                    <Route element={<GuestRoute/>}>
                        {/*Захищений маршрут від неавторизованих коритсувачів*/}
                    </Route>

                    <Route element={<PrivateRoute/>}>
                        {/*Захищений маршрут від авторизованих коритсувачів*/}
                    </Route>

                    <Route element={<AdminRoute/>}>
                        {/*Захищений маршрут від неавторизованих коритсувачів і тих хто НЕ містить роль - Адмін*/}
                    </Route>

                    <Route path="*" element={<NotFound/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
