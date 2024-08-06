import { useRef, useState, useEffect } from "react";
import * as Const from "../Constantes";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [usuarioVacio, setUsuarioVacio] = useState(true);
  const [claveVacio, setClaveVacio] = useState(true);

  let campoUsuario = useRef(null);
  let campoClave = useRef(null);

  useEffect(() => {
    let usuario = window.localStorage.getItem(Const.LOCAL_USUARIO);
    let apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);

    //Inicializa las keys en local storage si no hay datos
    if (usuario === null || apikey === null) {
      window.localStorage.setItem(Const.LOCAL_USUARIO, "");
      window.localStorage.setItem(Const.LOCAL_API_KEY, "");
      window.localStorage.setItem(Const.LOCAL_ID_USUARIO, "");
    }
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
            toast.error(Const.Const.ERROR_CONSULTA_API);
            console.log(res);
          }

          return res.json();
        })
        .then((datos) => {
          switch (datos.codigo) {
            case 200:
              toast.success("Login exitoso");
              window.localStorage.setItem(Const.LOCAL_USUARIO, usuario);
              window.localStorage.setItem(Const.LOCAL_API_KEY, datos.apiKey);
              window.localStorage.setItem(Const.LOCAL_ID_USUARIO, datos.id);
              navigate("/dashboard");
              break;
            case 409:
              toast.error(Const.ERROR_USUARIO_PASS);
              console.log(datos.mensaje);
              break;
            default:
              toast.error("Error inesperado.");
              console.log(datos);
          }
        })
        .catch((err) => {});
    }
  };

  const actualizarEstadoUsuario = (e) => {
    setUsuarioVacio(e.target.value === "");
  };
  const actualizarEstadoClave = (e) => {
    setClaveVacio(e.target.value === "");
  };

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
      <button onClick={login} disabled={usuarioVacio || claveVacio}>
        Login
      </button>
      <br></br>
      <a>¿Nuevo en el sistema? Regístrate aquí</a>

      <br></br>
    </div>
  );
};

export default Login;
