const Evento = (props) => {
  return (
    <div>
      <h3>
        {props.id}, {props.idCategoria}, {props.idUsuario}, {props.detalle}, {props.fecha},
      </h3>
    </div>
  );
};

export default Evento;
