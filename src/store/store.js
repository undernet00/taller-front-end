import { configureStore } from "@reduxjs/toolkit";
import eventosReducer from "../features/eventosSlice";
import deptociudadReducer from "../features/deptoCiudadSlice";
import categoriasReducer from "../features/categoriasSlice"

export const store = configureStore({
  reducer: {
    eventos: eventosReducer,
    deptociudad: deptociudadReducer,
    categorias: categoriasReducer,
  },
});
