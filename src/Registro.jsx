import { useEffect, useRef, useState } from "react";
import * as Const from "./Constantes";
import Combo from "./components/Combo";
const Registro = () => {
  let campoUsuario = useRef(null);
  let campoClave = useRef(null);
  let campoDepartamento = useRef(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado ] = useState("");


  const ciudadesMock = [
    { id: "1", nombre: "Lascano" },
    { id: "2", nombre: "Tarariras" },
  ];

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const opcionesDeConsulta = {
      method: "GET",
      headers: headers,
    };

    fetch(Const.URL_DEPARTAMENTOS , opcionesDeConsulta)
      .then((res) => {
        if (!res.ok) {
          throw Error("no se pudo obtener datos desde el recurso");
        }
        return res.json();
      })
      .then((datos) => {
        setDepartamentos(datos.departamentos);
      });
  }, []);

  return (
    <div>
      <h2>Registro</h2>
      <label>
        Usuario:
        <br></br>
        <input type="text" ref={campoUsuario} />
      </label>
      <br></br>
      <label>
        Contraseña:
        <br></br>
        <input type="text" ref={campoClave} />
      </label>
      <br></br>
      <label>
        Departamento:
        <br></br>
        <Combo lista={departamentos}></Combo>
      </label>
      <br></br>
      <label>
        Ciudad:
        <br></br>
        <Combo lista={ciudadesMock}></Combo>
      </label>
      <br></br>
      <br></br>
      <button>Guardar</button>
    </div>
  );
};

export default Registro;
