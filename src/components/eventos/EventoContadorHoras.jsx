import { useSelector } from "react-redux";
import { horasMinutosDesdeEventoMasReciente } from "./EventoUtils";

const EventoContadorHoras = (props) => {
  const eventos = useSelector((state) => state.eventos.eventos);

  let eventosDelTipo = eventos.filter((e) => {
    return e.idCategoria === props.idCategoria;
  });

  const tiempoDesdeUltimoEvento =
    horasMinutosDesdeEventoMasReciente(eventosDelTipo);
  const horasDesdeUltimoEvento = tiempoDesdeUltimoEvento.substring(0, 2);

  let estiloLetra = { color: "red" };

  if (Number(horasDesdeUltimoEvento) <4){
     estiloLetra = { color: "green" };
  }


  return (
    <div>
      <h2>Contador de Horas desde evento {"Biberón"}</h2>
      <p style={estiloLetra}>Tiempo desde el último evento: {tiempoDesdeUltimoEvento}</p>
    </div>
  );
};

export default EventoContadorHoras;
