import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categoryApi} from "../services/categoryService.ts";

const rootReducer = combineReducers({
    //приклад під'єднання апі
    // [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            // приклад під'єднання middleware
            // authApi.middleware,
            categoryApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;