import Eventos from "../components/eventos/Eventos";
import InformePorTipoEvento from "./eventos/InformePorTipoEvento";
import * as Const from "../Constantes";
import EventoContadorHoras from "./eventos/EventoContadorHoras";
import Menu from "./Menu";
import EventoFormulario from "./eventos/EventoFormulario";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let apiKey = localStorage.getItem(Const.LOCAL_API_KEY);

    //Protección de ruta
    if (apiKey === null || apiKey === "" || apiKey === "undefined") {
      navigate("/");
    }
  }),
    [];
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
            <div className="div-obli">
              <EventoContadorHoras idCategoria={Const.CATEGORIA_BIBERON} />
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
