import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deptociudad: {
    departamento: 0,
    ciudad: 0,
  },
};
export const deptoCiudadSlice = createSlice({
  name: "deptociudad",
  initialState,
  reducers: {
    guardarDepartamento: (state, action) => {
      state.deptociudad.departamento = action.payload;
    },
    guardarCiudad: (state, action) => {
      state.deptociudad.ciudad = action.payload;
    },
  },
});

export const { guardarDepartamento, guardarCiudad } = deptoCiudadSlice.actions;
export default deptoCiudadSlice.reducer;
