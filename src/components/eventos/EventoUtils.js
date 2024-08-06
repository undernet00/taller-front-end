import * as Const from "../../Constantes";
export const categoriaPorId = (idCategoriaBuscada, categorias) => {
  let categoriaBuscada = categorias.find(
    (cat) => cat.id === idCategoriaBuscada
  );
  if (categoriaBuscada !== undefined) return categoriaBuscada;

  return { id: 0, tipo: "", imagen: 0 };
};

const imagenDesdeCategoria = (idCategoriaBuscada, categorias) => {
  let categoriaBuscada = categorias.find(
    (cat) => cat.id === idCategoriaBuscada
  );
  if (categoriaBuscada !== undefined) return categoriaBuscada.imagen;
  return 0;
};

export const urlImagenCategoria = (idCategoria, categorias) => {
  return (
    Const.URL_IMAGENES + imagenDesdeCategoria(idCategoria, categorias) + ".png"
  );
};

//Devuelve los eventos del día si deHoy===true
//Devuelve los eventos anteriores al día de hoy si deHoy===false
export const getEventosParticionadosPorTiempo = (eventos, deHoy) => {
  return eventos.filter((e) => {
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0); //Para abarcar todo el día
    let fechaEvento = new Date(e.fecha);
    if (deHoy) {
      return fechaEvento >= hoy;
    } else {
      return fechaEvento < hoy;
    }
  });
};

//Retorna un string con la cantidad de HH:mm desde el último evento de la lista.
export const horasMinutosDesdeEventoMasReciente = (eventos) => {
  if (eventos.length === 0) {
    return "N/A";
  } else {
    let ahora = new Date();

    let fechaEvento = fechaHoraUltimoEvento(eventos); //El último por fecha/hora

    return diferenciaHoras(ahora, fechaEvento);
  }
};

const ordenarEventosPorTiempoDecreciente = (eventos) => {
  let eventosOrdenados = [...eventos].sort((a, b) => {
    let evento1 = new Date(a.fecha);
    let evento2 = new Date(b.fecha);

    return evento2 - evento1;
  });
  return eventosOrdenados;
};

const diferenciaHoras = (date1, date2) => {
  //Se usó ChatGPT con el siguiente prompt: "En java script. ¿Cómo puedo obtener una cadena de texto con las horas y minutos con el formato HH:mm con la diferencia entre dos objetos Date?"

  let diff = Math.abs(date2 - date1);

  let { horas, minutos } = milisegundosAHorasMinutos(diff);

  // Formatea las horas y minutos en HH:mm
  let horasFormateadas = String(horas).padStart(2, "0");
  let minutosFormateados = String(minutos).padStart(2, "0");
  return `${horasFormateadas}:${minutosFormateados}`;
};

export const milisegundosAHorasMinutos = (tiempoEnMilisegundos) => {
  let horas = Math.floor(tiempoEnMilisegundos / (1000 * 60 * 60));
  let minutos = Math.floor(
    (tiempoEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60)
  );

  return { horas, minutos };
};
export function fechaHoraUltimoEvento(eventos) {
  let eventosPorFechaDecreciente = ordenarEventosPorTiempoDecreciente(eventos);

  let fechaEvento = new Date(eventosPorFechaDecreciente[0].fecha); //El último por fecha/hora
  return fechaEvento;
}
