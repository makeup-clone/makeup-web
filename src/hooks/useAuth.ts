import { useProfileQuery } from "../apis/authApi.ts";

export const useAuth = () => {
    const {
        data: user,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useProfileQuery();

    const isAuthenticated = Boolean(user) && !error;
    const isAdmin = Boolean(
        isAuthenticated &&
        user?.roles?.includes("admin")
    );

    return {
        user: isAuthenticated ? user : undefined,
        isAuthenticated,
        isAdmin,
        isLoading,
        isFetching,
        error,
        refetch,
    };
};