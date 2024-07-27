import { useRef } from "react";
import { useState } from "react";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [token, setToken] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [esperando, setEsperando] = useState("");
  

  let campoUsuario = useRef(null);
  let campoClave = useRef(null);

  const login = () => {
    let usuario = campoUsuario.current.value;
    let clave = campoClave.current.value;

    if (usuario !== "" && clave !== "") {
      const opcionesDeConsulta = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: usuario,
          password: clave,
        }),
      };

      fetch(
        "https://babytracker.develotion.com//login.php",
        opcionesDeConsulta
      ).then((res) => {
        if (!res.ok) {
          throw Error("no se pudo obtener datos desde el recurso");
        }
        
        return res.json();
      }).then((datos) => {
        setUsuario(usuario);
        setToken(datos.apiKey);
        setEsperando(false);
        setError(null);
        console.log(datos)
        window.localStorage.setItem("user", usuario);
        window.localStorage.setItem("token", datos.apiKey);
      })
      .catch((err) => {
        setError(err.message);
        setEsperando(false);
      });

      
      
    }
  };

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
