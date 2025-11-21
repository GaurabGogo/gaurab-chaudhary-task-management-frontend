export interface UsersResponse {
  success: boolean;
  count: number;
  message: string;
  data: User[];
}

export interface UserResponse {
  success: boolean;
  count: number;
  message: string;
  data: User;
}

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};
