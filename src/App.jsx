import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./Login";
import Menu from "./Menu";
import Registro from "./Registro";
import Dashboard from "./Dashboard";
import EventoFormulario from "./EventoFormulario";

function App() {
  return (
    <Provider store={store}>
      <Menu />
      <Login />
      <Registro></Registro>
      <EventoFormulario></EventoFormulario>

      <Dashboard />
    </Provider>
  );
}

export default App;
