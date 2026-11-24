// import type {IRegisterRequest} from "../interfaces/IAuth/IRegisterRequest.ts";
import type {ILoginRequest} from "../interfaces/IAuth/ILoginRequest.ts";
import type {IProfile} from "../interfaces/IAuth/IProfile.ts";
import {baseApi} from "./baseApi.ts";
import type {IGoogleLoginRequest} from "../interfaces/IAuth/IGoogleLoginRequest.ts";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<void, FormData>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth']
        }),

        login: build.mutation<void, ILoginRequest>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        googleLogin: build.mutation<void, IGoogleLoginRequest>({
            query: (body) => ({
                url: 'auth/googleLogin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        logout: build.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth']
        }),

        profile: build.query<IProfile, void>({
            query: () => 'auth/profile',
            providesTags: ['Auth']
        }),
    }),
});

export const {
    useGoogleLoginMutation,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useProfileQuery,
} = authApi;