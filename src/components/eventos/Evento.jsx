import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import * as Const from "../../Constantes";
import * as LocalData from "../../LocalData";

import { eliminarEvento } from "../../features/eventosSlice";
import { urlImagenCategoria } from "./EventoUtils";

const Evento = (props) => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.categorias);

  const handleBorrar = () => {
    if (!LocalData.EstaLogueado()) {
      toast.error(Const.ERROR_APIKEY);
      return;
    }

    let { apikey, idUsuario } = LocalData.LeerDatos();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(Const.HEADER_API_KEY, apikey);
    headers.append(Const.HEADER_ID_USUARIO, idUsuario);

    //TODO: NTH Preguntar al usuario antes de eliminar
    const opcionesDeConsulta = {
      method: "DELETE",
      headers: headers,
    };

    fetch(Const.URL_EVENTOS_DELETE + props.id, opcionesDeConsulta)
      .then((res) => {
        if (!res.ok) {
          toast.error(Const.ERROR_CONSULTA_API);
        }
        dispatch(eliminarEvento(props.id));

        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td>
          <img src={urlImagenCategoria(props.idCategoria, categorias)} />
        </td>
        <td>{props.detalle}</td>
        <td>{props.fecha}</td>
        <td>
          <button onClick={handleBorrar} className="btn btn-primary btn-sm">
            Borrar
          </button>
        </td>
      </tr>
    </>
  );
};

export default Evento;
