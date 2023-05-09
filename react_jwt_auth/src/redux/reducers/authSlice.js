import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
  isAuth: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
