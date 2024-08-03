import { useSelector } from "react-redux";
import * as Const from "./Constantes";

const Evento = (props) => {
  const categorias = useSelector((state) => state.categorias.categorias);

  const imagenDesdeCategoria = (idCategoriaBuscada) => {

    let categoriaBuscada = categorias.find(
      (cat) => (cat.id === idCategoriaBuscada)
    );
    return categoriaBuscada.imagen;
  };

  const urlImagen = (idCategoria) => {
    return Const.URL_IMAGENES + imagenDesdeCategoria(idCategoria) + ".png";
  };
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <img src={urlImagen(props.idCategoria)} />
      </td>
      <td>{props.detalle}</td>
      <td>{props.fecha}</td>
      <td>
        {" "}
        <button>Borrar</button>
      </td>
    </tr>
  );
};

export default Evento;
