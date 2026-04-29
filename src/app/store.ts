import {configureStore} from "@reduxjs/toolkit";
import {headerSlice} from "./slices/headerSlice.ts";
import {userSlice} from "./slices/userSlice.ts";
import {api} from "../api/apiSlice.ts";
export const store = configureStore({
        reducer: {
            header: headerSlice.reducer,
            user: userSlice.reducer,
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(
                api.middleware,
            ),  // Add new middleware as parameters
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;