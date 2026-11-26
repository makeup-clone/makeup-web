import {Navigate, Outlet, useLocation} from "react-router";
import { useAuth } from "../hooks/useAuth";
import {useAuthModal} from "../hooks/useAuthModal.ts";
import {useEffect} from "react";

// Захищений маршрут від неавторизованих користувачів, щоб той не міг перейти до профілю через шлях.
export const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const { openLogin } = useAuthModal();
    const targetPath = `${useLocation().pathname}${useLocation().search}`

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            openLogin({ redirectTo: targetPath });
        }
    }, [isLoading, isAuthenticated, openLogin, targetPath]);

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
};

// Захищений маршрут від неавторизованих користувачів і тих хто НЕ містить роль - Адмін
export const AdminRoute = () => {
    const { isAuthenticated, isLoading, isAdmin } = useAuth();
    const location = useLocation();
    const { openLogin } = useAuthModal();
    const targetPath = `${location.pathname}${location.search}`

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            openLogin({ redirectTo: targetPath });
        }
    }, [isLoading, isAuthenticated, openLogin, targetPath]);

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    if (!isAdmin) {
        return <Navigate to="*" replace />;
    }

    return <Outlet />;
};

// Захищений маршрут від авторизованих користувачів, щоб той не міг перейти на шлях для логіну чи реєстрації.
export const GuestRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
};