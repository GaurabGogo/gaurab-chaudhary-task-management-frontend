import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  RegisterRequest,
  Response,
} from "../../../models/auth/auth-model";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<Response, LoginRequest>({
      query: (loginRequest: LoginRequest) => ({
        url: `auth/login`,
        method: "POST",
        body: loginRequest,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<Response, RegisterRequest>({
      query: (registerRequest: RegisterRequest) => ({
        url: `auth/register`,
        method: "POST",
        body: registerRequest,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<Response, void>({
      query: () => {
        return {
          url: `auth/logout`,
          method: "GET",
        };
      },
    }),
    refresh: builder.mutation<Response, void>({
      query: () => ({
        url: `auth/refresh`,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
} = authApi;
