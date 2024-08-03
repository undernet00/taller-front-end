import * as Const from "./Constantes";
import { useRef, useState, useEffect } from "react";
import Combo from "./components/Combo";
import Categorias from "./components/Categorias";
import { useDispatch, useSelector } from "react-redux";
import { agregarEvento } from "./features/eventosSlice";
const EventoFormulario = () => {
  const dispatch = useDispatch();

  const categoriaSeleccionada = useSelector(
    (state) => state.categorias.categoria
  );

  let campoFechaHora = useRef(null);
  let campoDetalle = useRef(null);

  const [fechaHora, setFechaHora] = useState("");

  const fechaHoraActual = () => {
    let fechaHora = new Date();
    fechaHora.setHours(fechaHora.getHours() - 3);
    return fechaHora.toISOString().slice(0, 16);
  };

  const handleGuardar = () => {
    const apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);
    const idUsuario = window.localStorage.getItem(Const.LOCAL_ID_USUARIO);

    if (apikey === null || apikey === "" || idUsuario === "") {
      console.log("falta token o id de usuario");
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(Const.HEADER_API_KEY, apikey);
    headers.append(Const.HEADER_ID_USUARIO, idUsuario);

    let evento = {
      id: 0,
      idCategoria: Number(categoriaSeleccionada),
      idUsuario: Number(idUsuario),
      detalle: campoDetalle.current.value,
      fecha: campoFechaHora.current.value,
    };

    if (categoriaSeleccionada !== 0 && campoFechaHora.current.value !== "") {
      const opcionesDeConsulta = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(evento),
      };

      fetch(Const.URL_EVENTOS_POST, opcionesDeConsulta)
        .then((res) => {
          if (!res.ok) {
            throw Error("no se pudo obtener datos desde el recurso");
          }

          return res.json();
        })
        .then((datos) => {
          evento.id = datos.idEvento;
          dispatch(agregarEvento(evento));

          //TODO: navegar al usuario hacia el dashboard
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h2>Nuevo Evento</h2>

      <label>
        Categoría:
        <br></br>
        <Categorias />
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
      <button onClick={handleGuardar}>Guardar</button>
    </div>
  );
};

export default EventoFormulario;
