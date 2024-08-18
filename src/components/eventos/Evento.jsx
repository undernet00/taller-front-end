import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import * as Const from "../../Constantes";
import * as LocalData from "../../LocalData";
import * as Rest from "../../RestHelper";

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

    let { apiKey, idUsuario } = LocalData.LeerDatos();

    fetch(
      Rest.URL_EVENTOS_DELETE + props.id,
      Rest.OpcionesParaDELETE(apiKey, idUsuario)
    )
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
