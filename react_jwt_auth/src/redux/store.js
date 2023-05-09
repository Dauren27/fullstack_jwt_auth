import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./reducers/authApi";
import authSlice from "./reducers/authSlice";
import { userApi } from "./reducers/userApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(authApi.middleware, userApi.middleware),
});
