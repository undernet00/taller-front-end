import Eventos from "../components/eventos/Eventos";
import InformePorTipoEvento from "./eventos/InformePorTipoEvento";
import * as Const from "../Constantes";
import * as LocalData from "../LocalData";
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
    //Protección de ruta
    if (!LocalData.EstaLogueado()) {
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
      <div className="row">
        <div className="col">
          <InformePorTipoEvento idCategoria={Const.CATEGORIA_BIBERON} />
        </div>
        <div className="col">
          <InformePorTipoEvento idCategoria={Const.CATEGORIA_PANAL} />
        </div>
        <div className="col">
          <EventoContadorHoras idCategoria={Const.CATEGORIA_BIBERON} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <EventoFormulario />
        </div>
        <div className="col">
          <Eventos />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
