import Eventos from "../components/eventos/Eventos";
import InformePorTipoEvento from "./eventos/InformePorTipoEvento";

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <InformePorTipoEvento idCategoria={35} />
      <InformePorTipoEvento idCategoria={33} />

      <Eventos />
    </>
  );
};

export default Dashboard;
