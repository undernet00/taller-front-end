import { useRef } from "react";
import Combo from "./components/Combo";
const Registro = () => {
  let campoUsuario = useRef(null);
  let campoClave = useRef(null);
  let campoDepartamento = useRef(null);

  const departamentosMock = [
    { id: "1", nombre: "Montevideo" },
    { id: "2", nombre: "Canelones" },
  ];
  const ciudadesMock = [
    { id: "1", nombre: "Lascano" },
    { id: "2", nombre: "Tarariras" },
  ];

  return (
    <div>
      <h2>Registro</h2>
      {/* Se solicitará usuario, contraseña, departamento y ciudad de residencia */}
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
        <Combo lista={departamentosMock}></Combo>
      </label>
      <br></br>
      <label>
        Ciudad:
        <br></br>
        <Combo lista={ciudadesMock}></Combo>
      </label>
      <br></br>
      <br></br>
      <button >
        Guardar
      </button>
    </div>
  );
};

export default Registro;
