import Evento from "./Evento";
import { useSelector } from "react-redux";
import { getEventosParticionadosPorTiempo } from "./EventoUtils";

const EventosLista = (props) => {
  const eventos = useSelector((state) => state.eventos.eventos);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Categoría</th>
            <th>Detalle</th>
            <th>Fecha/Hora</th>
          </tr>

          {getEventosParticionadosPorTiempo(eventos, props.actuales).map(
            (evento) => (
              <Evento key={evento.id} {...evento} />
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default EventosLista;
