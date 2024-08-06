import Eventos from "../components/eventos/Eventos";
import InformePorTipoEvento from "./eventos/InformePorTipoEvento";
import * as Const from "../Constantes";
import EventoContadorHoras from "./eventos/EventoContadorHoras";

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <EventoContadorHoras idCategoria={Const.CATEGORIA_BIBERON} />
      <InformePorTipoEvento idCategoria={Const.CATEGORIA_BIBERON} />
      <InformePorTipoEvento idCategoria={Const.CATEGORIA_PANAL} />

      <Eventos />
    </>
  );
};

export default Dashboard;
