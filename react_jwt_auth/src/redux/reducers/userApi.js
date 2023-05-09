import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../http";
import { authApi } from "./authApi";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    try {
      console.log("lalal");
      await authApi.endpoints.refresh().initiate();
      result = await baseQuery(args, api, extraOptions);
    } catch (e) {
      console.log(e);
    }
  }
  return result;
};
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "/users",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
