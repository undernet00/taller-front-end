import { toast } from "react-toastify";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { agregarEvento } from "../../features/eventosSlice";
import Categorias from "../Categorias";

import * as Const from "../../Constantes";
import * as LocalData from "../../LocalData";

const EventoFormulario = () => {
  const dispatch = useDispatch();

  const categoriaSeleccionada = useSelector(
    (state) => state.categorias.categoria
  );

  let campoFechaHora = useRef(null);
  let campoDetalle = useRef(null);

  const [fechaHora, setFechaHora] = useState("");

  const fechaHoraActual = () => {
    let fechaHora = new Date();
    fechaHora.setHours(fechaHora.getHours() - 3);
    return fechaHora.toISOString().slice(0, 16);
  };

  const formularioEsValido = () => {
    //La fecha no puede ser futura
    let fechaActual = new Date();
    let fechaCampo = new Date(campoFechaHora.current.value);
    if (fechaCampo <= fechaActual) return true;

    return false;
  };

  const handleGuardar = () => {
    if (!LocalData.EstaLogueado()) {
      toast.error(Const.ERROR_APIKEY);
      return;
    }

    let { apikey, idUsuario } = LocalData.LeerDatos();

    if (formularioEsValido()) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(Const.HEADER_API_KEY, apikey);
      headers.append(Const.HEADER_ID_USUARIO, idUsuario);

      let evento = {
        id: 0,
        idCategoria: Number(categoriaSeleccionada),
        idUsuario: Number(idUsuario),
        detalle: campoDetalle.current.value,
        fecha: campoFechaHora.current.value,
      };

      if (categoriaSeleccionada !== 0 && campoFechaHora.current.value !== "") {
        const opcionesDeConsulta = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(evento),
        };

        fetch(Const.URL_EVENTOS_POST, opcionesDeConsulta)
          .then((res) => {
            if (!res.ok) {
              toast.error(Const.ERROR_CONSULTA_API);
            }

            return res.json();
          })
          .then((datos) => {
            evento.id = datos.idEvento;
            dispatch(agregarEvento(evento));
            campoDetalle.current.value = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      toast.error(
        "Los datos en el formulario son inválidos. La fecha no puede ser futura."
      );
    }
  };

  return (
    <div className="card formulario">
      <div className="row">
        <div className="col-8 align-left-obli">
          <div className="row div-obli">
            <div className="col">
              <label>
                Categoría:
                <br></br>
                <Categorias />
              </label>
            </div>
            <div className="col">
              <label>
                Fecha/Hora:
                <br></br>
                <input
                  type="datetime-local"
                  ref={campoFechaHora}
                  defaultValue={fechaHoraActual()}
                />
              </label>
            </div>
          </div>
          <div className="col align-left-obli">
            <div className="row"></div>
          </div>
        </div>
        <div className="col align-left-obli">
          <div className="row">
            <label>
              Detalle:
              <textarea
                className="form-control form-control-lg text-obli div-obli"
                ref={campoDetalle}
              />
            </label>
          </div>
        </div>

        <div>
          <br />
          <button onClick={handleGuardar} className="btn btn-primary btn-sm">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventoFormulario;
