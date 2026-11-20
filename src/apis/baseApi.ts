import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import APP_ENV from "../env";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_ENV.API_BASE_URL}/api/`,
        credentials: 'include',
    }),
    tagTypes: ['Auth', 'Category'],
    endpoints: () => ({}),
});