import { createSlice } from "@reduxjs/toolkit";

const maintainerSlice = createSlice({
  name: "maintainer",
  initialState: {
    maintainers: [],
    totalPages: 0,
    loading: false,
    maintainer: null,
    error: null,
    message: null,
  },
  reducers: {
    fetchMaintainersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMaintainersSuccess(state, action) {
      state.maintainers = action.payload.maintainers;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    fetchMaintainersFailure(state, action) {
      state.message = action.payload.message;
      state.loading = false;
    },
  },
});

export const { fetchMaintainersStart, fetchMaintainersSuccess, fetchMaintainersFailure } =
  maintainerSlice.actions;
export default maintainerSlice.reducer;
