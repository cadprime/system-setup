import { configureStore } from "@reduxjs/toolkit";
import timeInReducer from "../slices/timeInSlice";

// THE GLOBAL STORE
export const store = configureStore({
  reducer: {
    timeIn: timeInReducer,
  },
});
