import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as Const from "./Constantes";

const Login = () => {
  const [error, setError] = useState("");
  const [esperando, setEsperando] = useState("");
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [usuarioVacio, setUsuarioVacio] = useState(true);
  const [claveVacio, setClaveVacio] = useState(true);

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

  const actualizarEstadoUsuario = (e) => {
    setUsuarioVacio(e.target.value === "");
  };
  const actualizarEstadoClave = (e) => {
    setClaveVacio(e.target.value === "");
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
      <h2>Login</h2>
      <label htmlFor="user">Usuario</label>
      <br></br>
      <input
        type="text"
        id="user"
        name="user"
        ref={campoUsuario}
        onChange={actualizarEstadoUsuario}
      />
      <br></br>
      <label htmlFor="password">Contraseña</label>
      <br></br>
      <input
        type="text"
        id="password"
        name="password"
        ref={campoClave}
        onChange={actualizarEstadoClave}
      />
      <br></br>
      <button onClick={login} disabled={(usuarioVacio || claveVacio)}>
        Login
      </button>
      <br></br>
      <a>¿Nuevo en el sistema? Regístrate aquí</a>

      <br></br>
    </div>
  );
};

export default Login;
