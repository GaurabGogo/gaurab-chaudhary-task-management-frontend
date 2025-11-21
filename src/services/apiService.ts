import handleApiError from "@/utils/handleApiError";
import axios from "axios";

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getRefreshToken = async () => {
  const response = await refreshInstance.post("/auth/refresh");
  return {
    accessToken: response.data.data.accessToken,
    refreshToken: response.data.data.refreshToken,
  };
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let refreshPromise: Promise<{
  accessToken: string;
  refreshToken: string;
}> | null = null;

// 🔹 Axios response interceptor for 401/403 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isForbidden =
      error.response?.status === 401 || error.response?.status === 403;

    const isLoginPage =
      typeof window !== "undefined" && window.location.pathname === "/login";

    if (isForbidden && isLoginPage) {
      return Promise.reject(error);
    }

    if (isForbidden && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("🔄 Attempting token refresh...");

      try {
        // Use shared refresh promise to avoid duplicate calls
        if (!refreshPromise) {
          refreshPromise = getRefreshToken().finally(() => {
            refreshPromise = null;
          });
        }

        const tokens = await refreshPromise;

        if (!tokens) throw new Error("No tokens returned from refresh");

        console.log("✅ Token refreshed, retrying original request...");
        return axiosInstance(originalRequest);
      } catch (err) {
        console.warn("❌ Token refresh failed:", err);

        const errMessage = handleApiError(err);

        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }

        return Promise.reject(errMessage);
      }
    }

    return Promise.reject(error);
  },
);

const apiService = {
  get: async (url: string, params: Record<string, any> = {}) => {
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  },

  post: async (url: string, data: any) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  },

  patch: async (url: string, data: any) => {
    try {
      const response = await axiosInstance.patch(url, data);
      return response.data;
    } catch (error) {
      console.error("PATCH Error:", error);
      throw error;
    }
  },
};

export default apiService;
