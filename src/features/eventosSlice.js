import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventos: [],
};
export const eventosSlice = createSlice({
  name: "eventos",
  initialState,
  reducers: {
    guardarEventos: (state, action) => {
      state.eventos = action.payload;
    },
    agregarEventos: (state, action) => {
      state.eventos.push(action.payload);
    },
  },
});

export const { guardarEventos, agregarEvento } = eventosSlice.actions;
export default eventosSlice.reducer;
