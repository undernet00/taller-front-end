import * as Const from "./Constantes";

const Evento = (props) => {
  const urlImagen = () => {
    return Const.URL_IMAGENES + 1 + ".png";
  };
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <img src={urlImagen()} />
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
