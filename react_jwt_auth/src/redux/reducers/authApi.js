import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../http";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    registration: build.mutation({
      query: (body) => ({
        url: "/registration",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation({
      query: (body) => ({
        url: "/logout",
        method: "POST",
        body,
      }),
    }),
    refresh: build.query({
      query: () => "/refresh",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useRefreshQuery,
} = authApi;
