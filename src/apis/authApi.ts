import type {IRegisterRequest} from "../interfaces/IAuth/IRegisterRequest.ts";
import type {ILoginRequest} from "../interfaces/IAuth/ILoginRequest.ts";
import type {IProfile} from "../interfaces/IAuth/IProfile.ts";
import {baseApi} from "./baseApi.ts";

export const authApi = baseApi.injectEndpoints({
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