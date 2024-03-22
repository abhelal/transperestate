import { createSlice } from "@reduxjs/toolkit";

const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    tenants: [],
    totalPages: 0,
    loading: false,
    loadingTenant: false,
    tenant: null,
    error: null,
    message: null,
  },
  reducers: {
    fetchTenantsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTenantsSuccess(state, action) {
      state.tenants = action.payload.tenants;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    fetchTenantsFailure(state, action) {
      state.message = action.payload.message;
      state.loading = false;
    },

    fetchTenantStart(state) {
      state.loadingTenant = true;
      state.error = null;
    },
    fetchTenantSuccess(state, action) {
      state.tenant = action.payload.tenant;
      state.loadingTenant = false;
    },
    fetchTenantFailure(state, action) {
      state.error = action.payload;
      state.loadingTenant = false;
    },
  },
});

export const {
  fetchTenantsStart,
  fetchTenantsSuccess,
  fetchTenantsFailure,
  fetchTenantStart,
  fetchTenantSuccess,
  fetchTenantFailure,
} = tenantSlice.actions;

export default tenantSlice.reducer;
