import * as Const from "./Constantes";
import { useEffect } from "react";
import Evento from "./Evento";
import { useDispatch, useSelector } from "react-redux";
import { guardarEventos } from "./features/eventosSlice";

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

          {eventos
            .filter((e) => {
              let hoy = new Date();
              hoy.setHours(0, 0, 0, 0); //Para abarcar todo el día
              let fechaEvento = new Date(e.fecha);
              if (props.actuales) {
                return fechaEvento >= hoy;
              } else {
                return fechaEvento < hoy;
              }
            })
            .map((evento) => (
              <Evento key={evento.id} {...evento} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventosLista;
