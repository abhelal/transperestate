import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/libs/features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};
