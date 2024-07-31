import "./App.css";
import Eventos from "./Eventos";
import Login from "./Login";
import Menu from "./Menu";
import Registro from "./Registro";
import Dashboard from "./Dashboard";
import EventoFormulario from "./EventoFormulario";

function App() {
  return (
    <>
      <Menu />
      <Login />
      <Registro></Registro>
<EventoFormulario></EventoFormulario>

      <Dashboard />
    </>
  );
}

export default App;
