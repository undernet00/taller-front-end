import * as Const from "../../Constantes";
import { ordenarEventosPorTiempoAscendente } from "../eventos/EventoUtils";

let diasSemana = new Map([
  [0, "Domingo"],
  [1, "Lunes"],
  [2, "Martes"],
  [3, "Miércoles"],
  [4, "Jueves"],
  [5, "Viernes"],
  [6, "Sábado"],
]);

export const ListadoEventosPorCategoria = (eventos, categorias) => {
  //Objeto con el formato esperado por Grafico
  let resultado = {
    etiquetas: [],
    valores: [],
  };

  categorias.forEach((c) => {
    let categoria = c.tipo;
    let cantidad = eventos.filter((e) => e.idCategoria === c.id).length;
    if (cantidad > 0) {
      resultado.etiquetas.push(categoria);
      resultado.valores.push(cantidad);
    }
  });
  return resultado;
};

export const ListadoComidasSemana = (eventos) => {
  let respuesta = {
    etiquetas: [],
    valores: [],
  };

  if (eventos.length > 0) {
    let ahora = new Date();

    //Resto 7 días
    let desde = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);

    let comidasUltimaSemana = eventos.filter(
      (e) =>
        new Date(e.fecha) >= desde && e.idCategoria === Const.CATEGORIA_COMIDA
    );

    let comidasUltimaSemanaOrdenada =
      ordenarEventosPorTiempoAscendente(comidasUltimaSemana);

    /*   let diaInicio = comidasUltimaSemanaOrdenada.map((c) =>
      new Date(c.fecha).getDay()
    )[0]; */
    let diaInicio = new Date().getDay();

    let diasDeLaUltimaSemana = ultimos7Dias(diaInicio);

    // Domingo -> Sábado : 0 -> 6
    for (let i = 0; i <= diasDeLaUltimaSemana.length - 1; i++) {
      let cantidadDelDia = comidasUltimaSemana.filter(
        (c) => new Date(c.fecha).getDay() === diasDeLaUltimaSemana[i]
      ).length;

      respuesta.etiquetas.push(diasSemana.get(diasDeLaUltimaSemana[i]));
      respuesta.valores.push(cantidadDelDia);
    }
  }
  return respuesta;
};

//Retorna una lista de días con los últimos 7 días incluyendo el actual.
//Ej: [6,0,1,2,3,4,5] termina el viernes, va hacia atrás, y comienza en sábado.
const ultimos7Dias = (inicial) => {
  let respuesta = [0, 0, 0, 0, 0, 0, 0];

  if (inicial !== undefined && inicial < 7) {
    let diaAnterior = 0;
    let diaActual = inicial;

    for (let i = respuesta.length - 1; i >= 0; i--) {
      if (diaActual >= 0 && diaActual <= 6) {
        respuesta[i] = diaActual;
      }
      diaActual--;

      if (diaActual < 0) diaActual = 6;
    }
  }
  return respuesta;
};
