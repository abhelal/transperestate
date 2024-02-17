import { createSlice } from "@reduxjs/toolkit";

let user;
let loading = true;

if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}
const initialState = {
  user: user ? user : null,
  loading,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialize: (state) => {
      state.loading = false;
    },
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { initialize, login, logout } = userSlice.actions;
export default userSlice.reducer;
