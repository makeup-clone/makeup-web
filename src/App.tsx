import {Route, Routes} from "react-router";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Catalog from "./pages/Catalog.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Contacts from "./pages/Contacts.tsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>} />
                    <Route path="/catalog" element={<Catalog/>} />
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route path="/contacts" element={<Contacts/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
