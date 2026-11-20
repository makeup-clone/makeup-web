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


    return {
        user: isAuthenticated ? user : undefined,
        isAuthenticated,
        isLoading,
        isFetching,
        error,
        refetch,
    };
};