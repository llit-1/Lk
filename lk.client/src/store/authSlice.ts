// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  phone: string | null;
  code: string | null;
}

const initialState: AuthState = {
  token: null,
  phone: '',
  code: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string | null, phone: string | null, code: string | null }>) => {
      console.log(action.payload)
      state.token = action.payload.token;
      state.phone = action.payload.phone;
      state.code = action.payload.code;
      localStorage.setItem('authToken', action.payload.token); // Сохраняем токен в localStorage
    },
    logout: (state) => {
      state.token = null;
      state.phone = '';
      state.code = false;
      localStorage.removeItem('authToken'); // Удаляем токен из localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
