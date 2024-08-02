import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
  categoria: 0
};

export const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    guardarCategorias: (state, action) => {
      state.categorias = action.payload;
    },
    guardarCategoria: (state, action) => {
      state.categoria = action.payload;
    },
  },
});

export const { guardarCategorias, guardarCategoria } = categoriasSlice.actions;
export default categoriasSlice.reducer;
