import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import APP_ENV from "../env";
import type {IRegisterRequest} from "../interfaces/IAuth/IRegisterRequest.ts";
import type {ILoginRequest} from "../interfaces/IAuth/ILoginRequest.ts";
import type {IProfile} from "../interfaces/IAuth/IProfile.ts";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_ENV.API_BASE_URL}/api/auth/`,
        credentials: 'include',
    }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        register: build.mutation<void, IRegisterRequest>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth']
        }),

        login: build.mutation<void, ILoginRequest>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        logout: build.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth']
        }),

        profile: build.query<IProfile, void>({
            query: () => 'profile',
            providesTags: ['Auth']
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useProfileQuery,
} = authApi;