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

  const handleLogin = (event) => {
    event.preventDefault();
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
      const toastLogin = toast.loading("Iniciando sesión...");
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
              /* toast.success("Login exitoso"); */
              toast.update(toastLogin, {
                render: "Acceso correcto",
                type: "success",
                isLoading: false,
                autoClose: 5000,
              });
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
        .catch((err) => {
          //solo errores de red
          toast.error("Error de comunicación.");
          console.log(datos);
        });
    }
  };

  const actualizarEstadoUsuario = (e) => {
    setUsuarioVacio(e.target.value === "");
  };
  const actualizarEstadoClave = (e) => {
    setClaveVacio(e.target.value === "");
  };

  return (
    <div className="card">
      <h2>Mi Bebé</h2>
      <form onSubmit={handleLogin}>
        <label>
          Usuario:
          <br />
          <input
            type="text"
            id="user"
            name="user"
            ref={campoUsuario}
            onChange={actualizarEstadoUsuario}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <br />
          <input
            type="password"
            id="password"
            name="password"
            ref={campoClave}
            onChange={actualizarEstadoClave}
            autoComplete="password"
          />
        </label>
        <br />
        <br />
        <div>
          <input type="submit" disabled={usuarioVacio || claveVacio} />
        </div>
        <br></br>
        <a
          className="a-obli"
          onClick={() => {
            navigate("/registro");
          }}
        >
          ¿Nuevo en el sistema? Regístrate aquí
        </a>
      </form>
      <br></br>
    </div>
  );
};

export default Login;
