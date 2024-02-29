import clientApi from "@/libs/clientApi";

import {
  fetchMaintainersStart,
  fetchMaintainersSuccess,
  fetchMaintainersFailure,
} from "./maintainerSlice";

export const fetchMaintainers = (params) => async (dispatch) => {
  dispatch(fetchMaintainersStart());
  try {
    const res = await clientApi.get("/maintainers/list", { params });
    dispatch(fetchMaintainersSuccess(res.data));
  } catch (error) {
    dispatch(fetchMaintainersFailure(error.response.data));
  }
};
