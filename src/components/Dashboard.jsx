import Eventos from "../components/eventos/Eventos";
import InformePorTipoEvento from "./eventos/InformePorTipoEvento";
import * as Const from "../Constantes";
import EventoContadorHoras from "./eventos/EventoContadorHoras";
import Menu from "./Menu";
import EventoFormulario from "./eventos/EventoFormulario";
import Grafica from "./graficas/Grafica";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ListadoEventosPorCategoria,
  ListadoComidasSemana,
} from "./graficas/Listados";

const Dashboard = () => {
  const navigate = useNavigate();
  const eventos = useSelector((state) => state.eventos.eventos);
  const categorias = useSelector((state) => state.categorias.categorias);
  const [eventosPorCategoria, setEventosPorCategoria] = useState({
    etiquetas: [],
    valores: [],
  });
  const [comidasDeLaSemana, setComidasDeLaSemana] = useState({
    etiquetas: [],
    valores: [],
  });

  useEffect(() => {
    let apiKey = localStorage.getItem(Const.LOCAL_API_KEY);

    //Protección de ruta
    if (apiKey === null || apiKey === "" || apiKey === "undefined") {
      navigate("/");
    }
  }),
    [];

  useEffect(() => {
    setEventosPorCategoria(ListadoEventosPorCategoria(eventos, categorias));
    setComidasDeLaSemana(ListadoComidasSemana(eventos));
  }, [eventos]);

  return (
    <div className="container">
      <div>
        <Menu />
      </div>
      <div className="row">
        <div className="col">
          <div className="div-obli">
            <Eventos />
          </div>
          <div className="div-obli">
            <EventoFormulario />
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="div-obli">
                <InformePorTipoEvento idCategoria={Const.CATEGORIA_BIBERON} />
              </div>
            </div>
            <div className="col">
              <div className="div-obli">
                <InformePorTipoEvento idCategoria={Const.CATEGORIA_PANAL} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="div-obli">
              <EventoContadorHoras idCategoria={Const.CATEGORIA_BIBERON} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Grafica
            titulo="Listado de Eventos"
            categoriasNombre="Categorías"
            datos={eventosPorCategoria}
            color="rgba(0, 99, 132, 0.5)"
          />
        </div>
        <div className="col">
          <Grafica
            titulo="Comidas de la Semana"
            categoriasNombre="Comidas"
            datos={comidasDeLaSemana}
            color="rgba(150, 99, 132, 0.5)"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
