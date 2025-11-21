import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

let refreshPromise: Promise<any> | null = null;

const redirectToLogin = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const requestTokenRefresh = (api: any, extraOptions: any): Promise<any> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        return await baseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        );
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
};

const baseQueryWithReauth: BaseQueryFn = async (
  args: any,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  const isForbidden =
    result.error?.status === 403 || result.error?.status === 401;

  const originalRequest = args as any;

  const isLoginPage =
    typeof window !== "undefined" && window.location.pathname === "/login";

  // If request is from login page → directly return error
  if (isLoginPage && isForbidden) {
    return result; // no refresh, no redirect
  }

  if (isForbidden && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshResult = await requestTokenRefresh(api, extraOptions);

      if (refreshResult?.data) {
        return await baseQuery(originalRequest, api, extraOptions);
      }

      redirectToLogin();
      return Promise.reject(refreshResult?.error);
    } catch (error) {
      redirectToLogin();
      return Promise.reject(error);
    }
  }

  return result;
};

export { baseQueryWithReauth };
