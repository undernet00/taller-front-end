import { useRef, useState, useEffect } from "react";
import * as Const from "../Constantes";
import * as LocalData from "../LocalData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "./Logo";

const Login = () => {
  const navigate = useNavigate();
  const [usuarioVacio, setUsuarioVacio] = useState(true);
  const [claveVacio, setClaveVacio] = useState(true);

  let campoUsuario = useRef(null);
  let campoClave = useRef(null);

  useEffect(() => {
    if (LocalData.EstaLogueado()) {
      navigate("/dashboard");
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
              toast.update(toastLogin, {
                render: "Acceso correcto",
                type: "success",
                isLoading: false,
                autoClose: 3000,
              });

              LocalData.GuardarDatos(datos.apiKey, datos.id, usuario);
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
      <Logo />
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
