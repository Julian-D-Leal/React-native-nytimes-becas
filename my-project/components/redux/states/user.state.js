/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    isAuthenticated: false,
    isGuest: null,
    isLoading: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      return {//se le asigna toda la información del usuario y se cambia a autenticado
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        isGuest: action.payload.is_guest,
      };
    },
    logout: (state, action) => {
      return {//se retorna el valor inicial empty
        token: "",
        isAuthenticated: false,
        isGuest: null,
        isLoading: false,
        user: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
