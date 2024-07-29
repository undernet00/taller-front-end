import { useState, useEffect } from "react";
import Evento from "./Evento";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [esperando, setEsperando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const apikey = window.localStorage.getItem("apikey");
    const idUsuario = window.localStorage.getItem("idusuario");

    if (apikey === "" || idUsuario === "") {
      console.log("falta token o id de usuario");
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("apikey", apikey);
    headers.append("iduser", idUsuario);

    const opcionesDeConsulta = {
      method: "GET",
      headers: headers,
    };

    fetch(
      "https://babytracker.develotion.com//eventos.php?idUsuario=49",
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
          <div>
            {eventos.map((evento) => (
              <Evento key={evento.id} {...evento} />
            ))}
          </div>
          <br></br>
        </div>
      );
    }
  }
};

export default Eventos;
