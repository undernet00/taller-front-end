import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as Const from "./Constantes";

const Login = () => {
  const [error, setError] = useState("");
  const [esperando, setEsperando] = useState("");
  const [estaLogueado, setEstaLogueado] = useState(false);

  let campoUsuario = useRef(null);
  let campoClave = useRef(null);

  useEffect(() => {
    let usuario = window.localStorage.getItem(Const.LOCAL_USUARIO);
    let apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);

    setEstaLogueado(usuario !== "" && apikey !== "");
  }, []);

  const login = () => {
    let usuario = campoUsuario.current.value;
    let clave = campoClave.current.value;

    if (usuario !== "" && clave !== "") {
      const opcionesDeConsulta = {
        method: "POST",
        header: Const.JSON_HEADER,
        body: JSON.stringify({
          usuario: usuario,
          password: clave,
        }),
      };

      fetch(Const.URL_LOGIN, opcionesDeConsulta)
        .then((res) => {
          if (!res.ok) {
            throw Error("no se pudo obtener datos desde el recurso");
          }

          return res.json();
        })
        .then((datos) => {
          window.localStorage.setItem(Const.LOCAL_USUARIO, usuario);
          window.localStorage.setItem(Const.LOCAL_API_KEY, datos.apiKey);
          window.localStorage.setItem(Const.LOCAL_ID_USUARIO, datos.id);

          setEsperando(false);
          setError(null);
          setEstaLogueado(true);

          //TODO: navegar al usuario hacia el dashboard
        })
        .catch((err) => {
          setError(err.message);
          setEsperando(false);
          setEstaLogueado(false);
        });
    }
  };

  if (estaLogueado) {
    return (
      <div>
        <p>Sesión iniciada.</p>
      </div>
    );
  }
  return (
    <div>
      <label htmlFor="user">Usuario</label>
      <br></br>
      <input type="text" id="user" name="user" ref={campoUsuario} />
      <br></br>
      <label htmlFor="password">Contraseña</label>
      <br></br>
      <input type="text" id="password" name="password" ref={campoClave} />
      <br></br>
      <button onClick={login}>Login</button>
      <br></br>
      <a>¿Nuevo en el sistema? Regístrate aquí</a>

      <br></br>
    </div>
  );
};

export default Login;
