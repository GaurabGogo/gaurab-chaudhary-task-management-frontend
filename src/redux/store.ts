import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from "./rootReducer"; // Updated to use persistedReducer

import { authApi } from "./services/auth/auth-api";
import { taskApi } from "./services/task/task-api";
import { userApi } from "./services/user/user-api";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApi.middleware, userApi.middleware, taskApi.middleware]),
});

// Persistor instance
export const persistor = persistStore(store);

// Types for root state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
