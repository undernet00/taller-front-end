import { useSelector } from "react-redux";
import {
  getEventosParticionadosPorTiempo,
  horasMinutosDesdeEventoMasReciente,
  categoriaPorId,
  urlImagenCategoria,
} from "./EventoUtils";

const InformePorTipoEvento = (props) => {
  //El re render de este componente lo disparan los cambios sobre Eventos. Que está en el estado global.
  //TODO: Hacer 1 sola línea con esto.
  const eventos = useSelector((state) => state.eventos.eventos);
  const categorias = useSelector((state) => state.categorias.categorias);
  const eventosDeHoy = getEventosParticionadosPorTiempo(eventos, true);

  let eventosDelTipoBuscado = eventosDeHoy.filter((e) => {
    return e.idCategoria === props.idCategoria;
  });

  const tiempoDesdeUltimoEvento = horasMinutosDesdeEventoMasReciente(
    eventosDelTipoBuscado
  );

  const categoria = categoriaPorId(props.idCategoria, categorias);

  return (
    <div>
      <h2>Informe de {categoria.tipo}</h2>
      <img src={urlImagenCategoria(props.idCategoria, categorias)} />
      <br />
      <p>Total de eventos en el día: {eventosDelTipoBuscado.length}</p>

      <p>Tiempo desde el último evento: {tiempoDesdeUltimoEvento}</p>
    </div>
  );
};

export default InformePorTipoEvento;
