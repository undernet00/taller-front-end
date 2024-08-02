import * as Const from "../Constantes";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarCiudad } from "../features/deptoCiudadSlice";

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
    const apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);
    const idUsuario = window.localStorage.getItem(Const.LOCAL_ID_USUARIO);

    if (apikey === "" || idUsuario === "") {
      console.log("falta token o id de usuario");
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(Const.HEADER_API_KEY, apikey);
    headers.append(Const.HEADER_ID_USUARIO, idUsuario);

    const opcionesDeConsulta = {
      method: "GET",
      headers: headers,
    };

    if (departamentoSeleccionado !== 0) {
      fetch(Const.URL_CIUDADES + departamentoSeleccionado, opcionesDeConsulta)
        .then((res) => {
          if (!res.ok) {
            throw Error("no se pudo obtener datos desde el recurso");
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
