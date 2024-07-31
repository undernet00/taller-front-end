import "./App.css";
import Eventos from "./Eventos";
import Login from "./Login";
import Menu from "./Menu";
import Registro from "./Registro";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <Menu />
      <Login />
      <Registro></Registro>

      <Dashboard />
    </>
  );
}

export default App;
