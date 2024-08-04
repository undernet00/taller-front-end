import { useEffect } from "react";
import Evento from "./Evento";
import { useDispatch, useSelector } from "react-redux";
import { guardarEventos } from "../../features/eventosSlice";
import { getEventosParticionadosPorTiempo } from "./EventoUtils";

const EventosLista = (props) => {
  const dispatch = useDispatch();

  const eventos = useSelector((state) => state.eventos.eventos);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Categoría</th>
            <th>Detalle</th>
            <th>Fecha/Hora</th>
          </tr>

          {getEventosParticionadosPorTiempo(eventos, props.actuales).map((evento) => (
            <Evento key={evento.id} {...evento} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventosLista;
