export interface Response {
  success: boolean;
  statusCode: number;
  count: number | null;
  message?: string;
  data: any | null;
  error?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
