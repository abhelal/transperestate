import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/libs/features/user/userSlice";
import propertyReducer from "@/libs/features/property/propertySlice";
import maintainerReducer from "./features/maintainer/maintainerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      property: propertyReducer,
      maintainer: maintainerReducer,
    },
  });
};
