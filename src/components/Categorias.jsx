import * as Const from "../Constantes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarCategorias,
  guardarCategoria,
} from "../features/categoriasSlice";
import { toast } from "react-toastify";

const Categorias = () => {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias.categorias);

  useEffect(() => {
    const apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);
    const idUsuario = window.localStorage.getItem(Const.LOCAL_ID_USUARIO);

    if (apikey === null || apikey === "" || idUsuario === "") {
      toast.error(Const.ERROR_APIKEY);
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

    fetch(Const.URL_CATEGORIAS, opcionesDeConsulta)
      .then((res) => {
        if (!res.ok) {
          toast.error(Const.ERROR_CONSULTA_API);
        }
        return res.json();
      })
      .then((datos) => {
        dispatch(guardarCategorias(datos.categorias));
        dispatch(guardarCategoria(datos.categorias[0].id));
      });
  }, []);

  return (
    <>
      <select
        onChange={(e) => {
          dispatch(guardarCategoria(e.target.value));
        }}
      >
        {categorias.map((item) => (
          <option key={item.id} value={item.id}>
            {item.tipo}{" "}
          </option>
        ))}
      </select>
    </>
  );
};

export default Categorias;
