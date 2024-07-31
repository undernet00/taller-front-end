import { useState, useEffect } from "react";
import Evento from "./Evento";
import * as Const from "./Constantes";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [esperando, setEsperando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);
    const idUsuario = window.localStorage.getItem(Const.LOCAL_ID_USUARIO);

    if (apikey === "" || idUsuario === "") {
      console.log("falta token o id de usuario");
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

    fetch(
      //TODO: Consultar porque solo vuelven los eventos del usuario 49
      /* Const.URL_EVENTOS_GET + idUsuario, */
      Const.URL_EVENTOS_GET + 49,
      opcionesDeConsulta
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("no se pudo obtener datos desde el recurso");
        }
        return res.json();
      })
      .then((datos) => {
        setEventos(datos.eventos);
        setEsperando(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setEsperando(false);
      });
  }, []);

  if (esperando) {
    return <p>Esperando datos...</p>;
  } else {
    if (eventos !== null) {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Id</th>
                <th>Categoría</th>
                <th>Detalle</th>
                <th>Fecha/Hora</th>
              </tr>

              {eventos.map((evento) => (
                <Evento key={evento.id} {...evento} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
};

export default Eventos;
