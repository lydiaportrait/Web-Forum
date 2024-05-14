import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAuthState {
  authenticated: boolean;
  isAdmin?: boolean;
  userId?: number;
  name?: string;
  token?: string;
}

export interface IAuthLoginPayload {
  name?: string;
  isAdmin?: boolean;
  id?: number;
  token?: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false
  } as IAuthState,
  reducers: {
    login: (_, action: PayloadAction<IAuthLoginPayload>) => {
      return {
        authenticated: true,
        isAdmin: action.payload.isAdmin,
        userId: action.payload.id,
        name: action.payload.name,
        token: action.payload.token
      };
    },
    logout: (_) => {
      return {
        authenticated: false
      };
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
