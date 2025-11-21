import { baseQueryWithReauth } from "@/lib/baseQuery";
import { UserResponse } from "@/models/users/users-model";

import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getMyUser: builder.query<UserResponse, void>({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMyUserQuery } = userApi;
