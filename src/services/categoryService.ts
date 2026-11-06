import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import APP_ENV from "../env";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_ENV.API_BASE_URL}/api/Categories/`,
    }),
    tagTypes: ['Category'],
    endpoints: (build) => ({
        // Запити можуть бути не точними і являються прикладом для подальшої роботи
        // 1. GET-запит (Отримати список)
        getCategories: build.query<any[], void>({
            query: () => '',
            providesTags: ['Category'],
        }),

        // 2. POST / MUTATION-запит (Створити / Додати)
        createCategory: build.mutation<any, any>({
            query: (newCategory) => ({
                url: '',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['Category'],
        }),

    }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;