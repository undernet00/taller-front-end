import * as Const from "../../Constantes"
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
  return Const.URL_IMAGENES + imagenDesdeCategoria(idCategoria, categorias) + ".png";
};

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

export const tiempoDesdeEventoMasReciente = (eventos) => {
  if (eventos.length === 0) {
    return "N/A";
  } else {
    let ahora = new Date();

    let eventosPorFechaDecreciente =
      ordenarEventosPorTiempoDecreciente(eventos);

    let fechaEvento = new Date(eventosPorFechaDecreciente[0].fecha); //El último por fecha/hora

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

  // Calcula la diferencia en milisegundos
  let diff = Math.abs(date2 - date1);

  // Convierte la diferencia a horas y minutos
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // Formatea las horas y minutos en HH:mm
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};
