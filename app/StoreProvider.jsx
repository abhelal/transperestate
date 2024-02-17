"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/libs/store";
import { initialize } from "@/libs/features/user/userSlice";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    setTimeout(() => {
      storeRef.current.dispatch(initialize());
    }, 10);
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
