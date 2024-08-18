import { useEffect, useState } from "react";
import * as LocalData from "../LocalData";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

const Menu = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let { nombreUsuario } = LocalData.LeerDatos();

    if (LocalData.EstaLogueado()) {
      setNombreUsuario(nombreUsuario);
    }
  });

  const handleLogout = () => {
    LocalData.InicializarData();
    setNombreUsuario("");
    navigate("/");
  };

  if (nombreUsuario !== "") {
    return (
      <div className="col card">
        <div className="row">
          <Logo />
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
