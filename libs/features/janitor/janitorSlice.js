import { createSlice } from "@reduxjs/toolkit";

const janitorSlice = createSlice({
  name: "janitor",
  initialState: {
    janitors: [],
    totalPages: 0,
    loading: false,
    janitor: null,
    error: null,
    message: null,
  },
  reducers: {
    fetchJanitorsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchJanitorsSuccess(state, action) {
      state.janitors = action.payload.janitors;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    fetchJanitorsFailure(state, action) {
      state.message = action.payload.message;
      state.loading = false;
    },
  },
});

export const { fetchJanitorsStart, fetchJanitorsSuccess, fetchJanitorsFailure } =
  janitorSlice.actions;

export default janitorSlice.reducer;
