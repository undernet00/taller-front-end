import { useEffect, useState } from "react";
import * as Const from "../Constantes";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const usuario = window.localStorage.getItem(Const.LOCAL_USUARIO);
    if (usuario !== "" && usuario !== "undefined") {
      setNombreUsuario(usuario);
    }
  });

  const handleLogout = () => {
    window.localStorage.setItem(Const.LOCAL_USUARIO, "");
    window.localStorage.setItem(Const.LOCAL_ID_USUARIO, "");
    window.localStorage.setItem(Const.LOCAL_API_KEY, "");
    setNombreUsuario("");
    navigate("/");
  };

  if (nombreUsuario !== "") {
    return (
      <div className="col">
        <div className="row">
          <h2>Dashboard</h2>
        </div>
        <div className="row">
          <div className="col">
            <label>Logueado como {nombreUsuario}.</label>
          </div>
          <div className="col">
            <button className="btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Dashboard</h2>
        <p>Debe iniciar sesión.</p>
      </div>
    );
  }
};

export default Menu;
