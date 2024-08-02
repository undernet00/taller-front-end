import { configureStore } from "@reduxjs/toolkit";
import eventosReducer from "../features/eventosSlice";
import deptociudadReducer from "../features/deptoCiudadSlice";

export const store = configureStore({
  reducer: {
    eventos: eventosReducer,
    deptociudad: deptociudadReducer,
  },
});
