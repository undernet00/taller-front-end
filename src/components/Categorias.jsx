import * as Const from "../Constantes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarCategorias, guardarCategoria } from "../features/categoriasSlice";

const Categorias = () => {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias.categorias);

  useEffect(() => {
    const apikey = window.localStorage.getItem(Const.LOCAL_API_KEY);
    const idUsuario = window.localStorage.getItem(Const.LOCAL_ID_USUARIO);

    if (apikey === null || apikey === "" || idUsuario === "") {
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

    fetch(Const.URL_CATEGORIAS, opcionesDeConsulta)
      .then((res) => {
        if (!res.ok) {
          throw Error("no se pudo obtener datos desde el recurso");
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
