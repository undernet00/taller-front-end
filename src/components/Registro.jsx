import { useEffect, useRef, useState } from "react";
import * as Const from "../Constantes";
import Departamentos from "./Departamentos";
import Ciudades from "./Ciudades";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registro = () => {
  const campoUsuario = useRef(null);
  const campoClave = useRef(null);

  const navigate = useNavigate();
  const [desactivarBoton, setDesactivarBoton] = useState(true);

  const ciudadSeleccionada = useSelector(
    (state) => state.deptociudad.deptociudad.ciudad
  );

  const departamentoSeleccionado = useSelector(
    (state) => state.deptociudad.deptociudad.departamento
  );

  const validarFormulario = () => {
    if (
      campoUsuario.current.value !== "" &&
      campoClave.current.value !== "" &&
      ciudadSeleccionada !== 0 &&
      departamentoSeleccionado !== 0
    ) {
      setDesactivarBoton(false);
    } else {
      setDesactivarBoton(true);
    }
  };

  const handleGuardar = () => {
    event.preventDefault();
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

    fetch(Const.URL_REGISTRO, opcionesDeConsulta)
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        console.log(datos);

        switch (datos.codigo) {
          case 200:
            window.localStorage.setItem(
              Const.LOCAL_USUARIO,
              campoUsuario.current.value
            );
            window.localStorage.setItem(Const.LOCAL_API_KEY, datos.apiKey);
            window.localStorage.setItem(Const.LOCAL_ID_USUARIO, datos.id);
            toast.success("Registro exitoso");
            navigate("/dashboard");
            break;
          default:
            toast.error(datos.mensaje);
            console.log();
        }
      })
      .catch((err) => {
        //solo errores de red
        toast.error("Error de comunicación.");
        console.log(err);
      });
  };

  return (
    <div className="card formulario">
      <h2>Registro</h2>
      <form onSubmit={handleGuardar}>
        <label>
          Usuario:
          <br></br>
          <input type="text" ref={campoUsuario} onChange={validarFormulario} />
        </label>
        <br />
        <label>
          Contraseña:
          <br></br>
          <input type="text" ref={campoClave} onChange={validarFormulario} />
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
        <input type="submit" disabled={desactivarBoton} />
        <br></br>
        <a
          className="a-obli"
          onClick={() => {
            navigate("/");
          }}
        >
          Volver
        </a>
      </form>
    </div>
  );
};

export default Registro;
