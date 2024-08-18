import * as Const from "../Constantes";
import * as Rest from "../RestHelper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarCiudad } from "../features/deptoCiudadSlice";
import { toast } from "react-toastify";

const Ciudades = () => {
  const [ciudades, setCiudades] = useState([]);
  const dispatch = useDispatch();

  const cidadSeleccionada = useSelector(
    (state) => state.deptociudad.deptociudad.ciudad
  );

  const departamentoSeleccionado = useSelector(
    (state) => state.deptociudad.deptociudad.departamento
  );

  useEffect(() => {
    if (departamentoSeleccionado !== 0) {
      fetch(
        Rest.URL_CIUDADES + departamentoSeleccionado,
        Rest.OpcionesParaGET("", "")
      )
        .then((res) => {
          if (!res.ok) {
            toast.error(Const.ERROR_CONSULTA_API);
          }
          return res.json();
        })
        .then((datos) => {
          setCiudades(datos.ciudades);
          dispatch(guardarCiudad(datos.ciudades[0].id));
        });
    }
  }, [departamentoSeleccionado]);

  return (
    <>
      <select
        onChange={(e) => {
          dispatch(guardarCiudad(e.target.value));
        }}
      >
        {ciudades.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}{" "}
          </option>
        ))}
      </select>
    </>
  );
};

export default Ciudades;
