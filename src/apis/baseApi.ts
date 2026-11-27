import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import APP_ENV from "../env";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";

// Базовий клієнт RTK Query: вказуємо префікс API і дозволяємо передачу/прийом HttpOnly cookies між портами
const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${APP_ENV.API_BASE_URL}/api/`,
    credentials: 'include',
});

// Спільний проміс поточного рефрешу (захист від гонки при паралельних 401 і ротації refresh_token)
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(
    api: Parameters<BaseQueryFn>[1],
    extraOptions: Parameters<BaseQueryFn>[2]
): Promise<boolean> {
    // Якщо рефреш ще не запущений — стартуємо один запит на оновлення токенів
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const refreshResult = await rawBaseQuery(
                { url: 'auth/refresh', method: 'POST' },
                api,
                extraOptions
            );
            // Бекенд сам перезаписує cookies при 200 OK; при помилці повертаємо false
            return !refreshResult.error;
        })().finally(() => {
            // Очищаємо замок після завершення, щоб наступні рефреші в майбутньому працювали
            refreshPromise = null;
        });
    }

    // Усі запити, які прийшли під час активного рефрешу, чекають на той самий проміс
    return refreshPromise;
}

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Якщо оновлення токена вже йде — чекаємо його, щоб не відправити запит зі старим access_token
    if (refreshPromise) {
        await refreshPromise;
    }

    let result = await rawBaseQuery(args, api, extraOptions);

    // Нормалізуємо URL, щоб коректно перевірити, чи це не auth-ендпоінт
    const rawUrl = typeof args === 'string' ? args : args.url;
    const normalizedUrl = rawUrl.replace(/^\/+/, '').toLowerCase();

    // Для логіну, реєстрації, Google-входу та самого refresh авто-рефреш при 401 не запускаємо
    const isAuthEndpoint =
        normalizedUrl === 'auth/login' ||
        normalizedUrl === 'auth/register' ||
        normalizedUrl === 'auth/googlelogin' ||
        normalizedUrl === 'auth/refresh';

    if (result.error?.status === 401 && !isAuthEndpoint) {
        const refreshed = await refreshAccessToken(api, extraOptions);

        if (refreshed) {
            // Новий access_token уже в cookie — повторюємо початковий запит
            result = await rawBaseQuery(args, api, extraOptions);
        }
    }

    return result;
};

// Кореневий API для RTK Query: інші модулі підключають свої ендпоінти через injectEndpoints
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Auth', 'Category'],
    endpoints: () => ({}),
});