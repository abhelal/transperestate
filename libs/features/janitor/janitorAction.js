import clientApi from "@/libs/clientApi";
import { fetchJanitorsStart, fetchJanitorsSuccess, fetchJanitorsFailure } from "./janitorSlice";

export const fetchJanitors = (params) => async (dispatch) => {
  dispatch(fetchJanitorsStart());
  try {
    const res = await clientApi.get("/janitors/list", { params });
    dispatch(fetchJanitorsSuccess(res.data));
  } catch (error) {
    dispatch(fetchJanitorsFailure(error.response.data));
  }
};
