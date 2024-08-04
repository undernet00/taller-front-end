import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Registro from "./components/Registro";
import Dashboard from "./components/Dashboard";
import EventoFormulario from "./components/eventos/EventoFormulario";

function App() {
  return (
    <Provider store={store}>
      <Menu />
      <Dashboard />
      <Login />
      <Registro></Registro>
      <EventoFormulario></EventoFormulario>
    </Provider>
  );
}

export default App;
