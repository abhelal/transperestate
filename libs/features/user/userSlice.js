import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeAuth: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { initializeAuth, login, logout } = userSlice.actions;
export default userSlice.reducer;
