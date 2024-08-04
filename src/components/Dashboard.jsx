import Eventos from "../components/eventos/Eventos";
import InformePorTipoEvento from "./eventos/InformePorTipoEvento";
import * as Const from "../Constantes";

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <InformePorTipoEvento idCategoria={Const.CATEGORIA_BIBERON} />
      <InformePorTipoEvento idCategoria={Const.CATEGORIA_PANAL} />

      <Eventos />
    </>
  );
};

export default Dashboard;
