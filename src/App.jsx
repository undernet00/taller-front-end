import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
