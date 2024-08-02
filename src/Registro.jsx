import { useEffect, useRef, useState } from "react";
import * as Const from "./Constantes";
import Departamentos from "./components/Departamentos";
import Ciudades from "./components/Ciudades";
import { useSelector } from "react-redux";

const Registro = () => {
  let campoUsuario = useRef(null);
  let campoClave = useRef(null);

  const ciudadSeleccionada = useSelector(
    (state) => state.deptociudad.deptociudad.ciudad
  );

  const departamentoSeleccionado = useSelector(
    (state) => state.deptociudad.deptociudad.departamento
  );

  // Controlar datos del formulario
  // Postear el nuevo usuario

  const esValidoElFormulario = () => {
    if (
      campoUsuario.value === "" ||
      campoClave.value === "" ||
      ciudadSeleccionada === 0 ||
      departamentoSeleccionado === 0
    )
      return false;

    return true;
  };

  const handleGuardar = () => {
    if (!esValidoElFormulario()) {
      console.log("El formulario tiene algún error.");
      return;
    }

    let usuario = window.localStorage.getItem(Const.LOCAL_USUARIO);
    let apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);

    if (usuario !== "" && apikey !== "") {
      const opcionesDeConsulta = {
        method: "POST",
        header: Const.JSON_HEADER,
        body: JSON.stringify({
          usuario: campoUsuario.current.value,
          password: campoClave.current.value,
          idDepartamento: departamentoSeleccionado,
          idCiudad: ciudadSeleccionada,
        }),
      };
      console.log(opcionesDeConsulta);

      fetch(Const.URL_REGISTRO, opcionesDeConsulta)
        .then((res) => {
          if (!res.ok) {
            console.log(res);
            console.log(res.body);
          }

          return res.json();
        })
        .then((datos) => {
          window.localStorage.setItem(Const.LOCAL_USUARIO, campoUsuario.current.value);
          window.localStorage.setItem(Const.LOCAL_API_KEY, datos.apiKey);
          window.localStorage.setItem(Const.LOCAL_ID_USUARIO, datos.id);

          //TODO: navegar al usuario hacia el dashboard
        })
        .catch((err) => {
          throw Error("no se pudo obtener datos desde el recurso");
        });
    }
  };

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
        <Departamentos />
      </label>
      <br></br>
      <label>
        Ciudad:
        <br></br>
        <Ciudades />
      </label>
      <br></br>
      <br></br>
      <button onClick={handleGuardar}>Guardar</button>
    </div>
  );
};

export default Registro;
