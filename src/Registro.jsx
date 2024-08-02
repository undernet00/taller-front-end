import { useEffect, useRef, useState } from "react";
import * as Const from "./Constantes";
import Departamentos from "./components/Departamentos";
import Ciudades from "./components/Ciudades";
const Registro = () => {
  let campoUsuario = useRef(null);
  let campoClave = useRef(null);

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
      <button>Guardar</button>
    </div>
  );
};

export default Registro;
