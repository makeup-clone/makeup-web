import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categoryApi} from "../apis/categoryApi.ts";
import {authApi} from "../apis/authApi.ts";

const rootReducer = combineReducers({
    //приклад під'єднання апі
    // [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            // приклад під'єднання middleware
            // authApi.middleware,
            categoryApi.middleware,
            authApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;