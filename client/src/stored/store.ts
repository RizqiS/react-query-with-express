import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import blogSlice from "./blogSlice";

export const store = configureStore({
  reducer: { modal: modalSlice, blog: blogSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
