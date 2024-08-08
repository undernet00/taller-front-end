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
  let ahora = new Date();

  //Resto 7 días
  let desde = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);

  let comidasUltimaSemana = eventos.filter(
    (e) =>
      new Date(e.fecha) >= desde && e.idCategoria === Const.CATEGORIA_COMIDA
  );

  let comidasUltimaSemanaOrdenada =
    ordenarEventosPorTiempoAscendente(comidasUltimaSemana);

  let respuesta = {
    etiquetas: [],
    valores: [],
  };

  let dias = comidasUltimaSemanaOrdenada.map((c) => new Date(c.fecha).getDay());
  let diaInicio = dias[0];
  let diaFinal = dias[dias.length - 1];

  let diasSinDuplicado = removewithfilter(dias);

/*   console.log(diasSemana.get(diaInicio), diasSemana.get(diaFinal));
  console.log(diaInicio, diaFinal); */
  // Domingo -> Sábado : 0 -> 6
  for (let i = 0; i <= diasSinDuplicado.length - 1; i++) {
    let cantidadDelDia = comidasUltimaSemana.filter(
      (c) => new Date(c.fecha).getDay() === diasSinDuplicado[i]
    ).length;
    if (cantidadDelDia > 0) {
      respuesta.etiquetas.push(diasSemana.get(diasSinDuplicado[i]));
      respuesta.valores.push(cantidadDelDia);
    }
  }

  return respuesta;
};

function removewithfilter(arr) {
  let outputArray = arr.filter((item, index, self) => {
    // It returns the index of the first
    // instance of each value
    return index == self.indexOf(item);
  });

  return outputArray;
}
