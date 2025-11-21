import { UsersResponse } from "@/models/users/users-model";
import apiService from "../apiService";

// Fetch all users with optional query parameters
export const fetchAllUsers = async (
  queryObj: Record<string, any> = {},
): Promise<UsersResponse> => {
  try {
    const users = await apiService.get("/users", queryObj);
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const getMe = async (): Promise<any> => {
  try {
    const response = await apiService.get("/users/me");
    return response;
  } catch (error) {
    console.error("Failed to get me:", error);
    throw error;
  }
};
