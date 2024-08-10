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
      <div className="col card">
        <div className="row">
          <div className="col align-right-obli">
            <img
              src="../../baby.png"
              alt="babé app logo"
              className="nav-imagen-obli"
            />
          </div>
          <div className="col nav-titulo-obli">
            <h2>Mi Bebé</h2>
          </div>
        </div>
        <div className="row">
          <div className="col align-left-obli">
            <label>Logueado como {nombreUsuario}.</label>
          </div>
          <div className="col align-right-obli">
            <a className="a-obli" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Mi Bebé</h2>
        <p>Debe iniciar sesión.</p>
      </div>
    );
  }
};

export default Menu;
