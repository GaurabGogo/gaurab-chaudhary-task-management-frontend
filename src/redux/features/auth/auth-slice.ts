import { User } from "@/models/users/users-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string;
  refreshToken: string;
}

export interface TokenStateType {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
  user: null,
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    unSetUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setTokens(state, action: PayloadAction<TokenStateType>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    unSetTokens(state) {
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setUser, unSetUser, setTokens, unSetTokens } = authSlice.actions;

export default authSlice.reducer;
