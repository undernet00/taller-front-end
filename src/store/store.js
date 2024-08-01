import { configureStore } from "@reduxjs/toolkit";
import eventosReducer from "../features/eventosSlice";
import departamentosReducer from "../features/eventosSlice";

export const store = configureStore({
  reducer: {
    eventos: eventosReducer,
  },
});
