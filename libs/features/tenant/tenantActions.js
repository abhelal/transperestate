import clientApi from "@/libs/clientApi";

import {
  fetchTenantsStart,
  fetchTenantsSuccess,
  fetchTenantsFailure,
  fetchTenantStart,
  fetchTenantSuccess,
  fetchTenantFailure,
} from "./tenantSlice";

export const fetchTenants = (params) => async (dispatch) => {
  dispatch(fetchTenantsStart());
  try {
    const res = await clientApi.get("/tenants/list", { params });
    dispatch(fetchTenantsSuccess(res.data));
  } catch (error) {
    dispatch(fetchTenantsFailure(error.response.data));
  }
};

export const fetchTenant = (id) => async (dispatch) => {
  dispatch(fetchTenantStart());
  try {
    const res = await clientApi.get(`/tenants/${id}`);
    dispatch(fetchTenantSuccess(res.data));
  } catch (error) {
    dispatch(fetchTenantFailure(error.response.data));
  }
};
