import * as Const from "../Constantes";
import * as Rest from "../RestHelper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarDepartamento } from "../features/deptoCiudadSlice";
import { toast } from "react-toastify";

const Departamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const dispatch = useDispatch();

  const departamentoSeleccionado = useSelector(
    (state) => state.deptociudad.deptociudad.departamento
  );

  useEffect(() => {
    
    fetch(Rest.URL_DEPARTAMENTOS, Rest.OpcionesParaGET("", ""))
      .then((res) => {
        if (!res.ok) {
          toast.error(Const.ERROR_CONSULTA_API);
        }
        return res.json();
      })
      .then((datos) => {
        setDepartamentos(datos.departamentos);
        dispatch(guardarDepartamento(datos.departamentos[0].id));
      });
  }, []);

  return (
    <>
      <select
        onChange={(e) => {
          dispatch(guardarDepartamento(e.target.value));
        }}
        defaultValue=""
      >
        {departamentos.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}{" "}
          </option>
        ))}
      </select>
    </>
  );
};

export default Departamentos;
