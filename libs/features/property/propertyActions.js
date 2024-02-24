import {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  fetchPropertyStart,
  fetchPropertySuccess,
  fetchPropertyFailure,
} from "./propertySlice";

import clientApi from "@/libs/clientApi";

export const fetchProperties = (params) => async (dispatch) => {
  dispatch(fetchPropertiesStart());
  try {
    const res = await clientApi.get("/properties/list", { params });
    dispatch(fetchPropertiesSuccess(res.data));
  } catch (error) {
    dispatch(fetchPropertiesFailure(error.response.data));
  }
};

export const fetchProperty = (id) => async (dispatch) => {
  dispatch(fetchPropertyStart());
  try {
    const res = await clientApi.get(`/properties/${id}`);
    dispatch(fetchPropertySuccess(res.data));
  } catch (error) {
    dispatch(fetchPropertyFailure(error.response.data));
  }
};
