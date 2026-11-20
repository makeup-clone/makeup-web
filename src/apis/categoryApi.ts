import type {ICategory} from "../interfaces/ICategory.ts";
import {baseApi} from "./baseApi.ts";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<ICategory[], void>({
            query: () => 'categories/getAll',
            providesTags: ['Category'],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;