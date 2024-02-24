import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  totalPages: 0,
  loading: false,
  property: null,
  loadingProperty: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    fetchPropertiesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPropertiesSuccess(state, action) {
      state.loading = false;
      state.properties = action.payload.properties;
      state.totalPages = action.payload.totalPages;
    },
    fetchPropertiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPropertyStart(state) {
      state.loadingProperty = true;
      state.error = null;
    },
    fetchPropertySuccess(state, action) {
      state.loadingProperty = false;
      state.property = action.payload.property;
    },

    fetchPropertyFailure(state, action) {
      state.loadingProperty = false;
      state.property = null;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  fetchPropertyStart,
  fetchPropertySuccess,
  fetchPropertyFailure,
} = propertySlice.actions;

export default propertySlice.reducer;
