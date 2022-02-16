import { configureStore } from "@reduxjs/toolkit";
import checkinSlice from "./checkin/checkinSlice";
import todoSlice from "./todo/todoSlice";
export const store = configureStore({
  reducer: {
    todoSlice,
    checkinSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
