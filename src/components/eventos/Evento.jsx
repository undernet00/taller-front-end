import { useDispatch, useSelector } from "react-redux";
import * as Const from "../../Constantes";
import { eliminarEvento } from "../../features/eventosSlice";
import { urlImagenCategoria } from "./EventoUtils";

const Evento = (props) => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.categorias);

  const handleBorrar = () => {
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

    //TODO: Preguntar al usuario antes de eliminar
    const opcionesDeConsulta = {
      method: "DELETE",
      headers: headers,
    };

    fetch(Const.URL_EVENTOS_DELETE + props.id, opcionesDeConsulta)
      .then((res) => {
        if (!res.ok) {
          throw Error("no se pudo obtener datos desde el recurso");
        }
        dispatch(eliminarEvento(props.id));

        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <img src={urlImagenCategoria(props.idCategoria, categorias)} />
      </td>
      <td>{props.detalle}</td>
      <td>{props.fecha}</td>
      <td>
        <button onClick={handleBorrar}>Borrar</button>
      </td>
    </tr>
  );
};

export default Evento;
