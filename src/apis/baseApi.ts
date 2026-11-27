import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import APP_ENV from "../env";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${APP_ENV.API_BASE_URL}/api/`,
    credentials: 'include',
});

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(
    api: Parameters<BaseQueryFn>[1],
    extraOptions: Parameters<BaseQueryFn>[2]
): Promise<boolean> {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const refreshResult = await rawBaseQuery(
                { url: 'auth/refresh', method: 'POST' },
                api,
                extraOptions
            );
            return !refreshResult.error;
        })().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Якщо в цей момент уже триває оновлення токена — чекаємо його
    if (refreshPromise) {
        await refreshPromise;
    }

    let result = await rawBaseQuery(args, api, extraOptions);

    const rawUrl = typeof args === 'string' ? args : args.url;
    const normalizedUrl = rawUrl.replace(/^\/+/, '').toLowerCase();

    const isAuthEndpoint =
        normalizedUrl === 'auth/login' ||
        normalizedUrl === 'auth/register' ||
        normalizedUrl === 'auth/googlelogin' ||
        normalizedUrl === 'auth/refresh';

    if (result.error?.status === 401 && !isAuthEndpoint) {
        const refreshed = await refreshAccessToken(api, extraOptions);

        if (refreshed) {
            // Нова access_token cookie вже записана — повторюємо початковий запит
            result = await rawBaseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Auth', 'Category'],
    endpoints: () => ({}),
});