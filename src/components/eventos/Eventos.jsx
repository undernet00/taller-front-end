import * as Const from "../../Constantes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarEventos } from "../../features/eventosSlice";
import EventosLista from "./EventosLista";
import { toast } from "react-toastify";

const Eventos = () => {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.eventos.eventos);

  const [actualesToggle, setActualesToggle] = useState(true);

  const handleToggle = () => {
    setActualesToggle(!actualesToggle);
  };

  useEffect(() => {
    const apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);
    const idUsuario = window.localStorage.getItem(Const.LOCAL_ID_USUARIO);

    if (apikey === null || apikey === "" || idUsuario === "") {
      toast.error(Const.ERROR_APIKEY);

      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(Const.HEADER_API_KEY, apikey);
    headers.append(Const.HEADER_ID_USUARIO, idUsuario);

    const opcionesDeConsulta = {
      method: "GET",
      headers: headers,
    };

    fetch(Const.URL_EVENTOS_GET + idUsuario, opcionesDeConsulta)
      .then((res) => {
        if (!res.ok) {
          toast.error(Const.ERROR_CONSULTA_API);
        }
        return res.json();
      })
      .then((datos) => {
        dispatch(guardarEventos(datos.eventos));
      });
  }, []);

  let NombreBoton = "";
  if (actualesToggle) {
    NombreBoton = "Mostrar Anteriores";
  } else {
    NombreBoton = "Mostrar Actuales";
  }

  return (
    <div className="col">
      <button onClick={handleToggle} className="btn btn-primary btn-sm">{NombreBoton}</button>
      <br></br>
      <EventosLista actuales={actualesToggle} />
    </div>
  );
};

export default Eventos;
