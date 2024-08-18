import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Const from "../Constantes";
import * as LocalData from "../LocalData";
import * as Rest from "../RestHelper";
import {
  guardarCategorias,
  guardarCategoria,
} from "../features/categoriasSlice";

const Categorias = () => {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias.categorias);

  useEffect(() => {
    if (!LocalData.EstaLogueado()) {
      toast.error(Const.ERROR_APIKEY);
      return;
    }

    let { apiKey, idUsuario } = LocalData.LeerDatos();

    fetch(Rest.URL_CATEGORIAS, Rest.OpcionesParaGET(apiKey, idUsuario))
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
      <div className="col">
        <select
          className="bg-light text-black select-obli"
          onChange={(e) => {
            let cat = e.target.value;
            dispatch(guardarCategoria(cat));
          }}
        >
          {categorias.map((item) => (
            <option key={item.id} value={item.id}>
              {item.tipo}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Categorias;
