import { useRef, useState, useEffect } from "react";
import Combo from "./components/Combo";
import Categorias from "./components/Categorias";
const EventoFormulario = () => {
  let campoCategoria = useRef(null);
  let campoFechaHora = useRef(null);
  let campoDetalle = useRef(null);

  const [fechaHora, setFechaHora] = useState("");

  const categoriasMock = [
    { id: "1", nombre: "Mamadera" },
    { id: "2", nombre: "Pañales" },
  ];

  const fechaHoraActual = () => {
    let fechaHora = new Date();
    fechaHora.setHours(fechaHora.getHours() - 3);
    return fechaHora.toISOString().slice(0, 16);
  };

  return (
    <div>
      <h2>Nuevo Evento</h2>

      <label>
        Categoría:
        <br></br>
        <Categorias/>
      </label>
      <br></br>
      <label>
        Fecha/Hora:
        <br></br>
        <input
          type="datetime-local"
          ref={campoFechaHora}
          defaultValue={fechaHoraActual()}
        />
      </label>
      <br></br>
      <label>
        Detalle:
        <br></br>
        <textarea ref={campoDetalle} />
      </label>
      <br></br>

      <br></br>
      <button>Guardar</button>
    </div>
  );
};

export default EventoFormulario;
