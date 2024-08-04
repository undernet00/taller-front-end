import { useEffect, useState } from "react";
import * as Const from "../Constantes";

const Menu = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const usuario = window.localStorage.getItem(Const.LOCAL_USUARIO);
    if (usuario !== "" && usuario !== "undefined") {
      setNombreUsuario(usuario);
    }
  });

  const handleLogout = ()=>{
    window.localStorage.setItem(Const.LOCAL_USUARIO, "");
    window.localStorage.setItem(Const.LOCAL_ID_USUARIO , "");
    window.localStorage.setItem(Const.LOCAL_API_KEY, "");
    setNombreUsuario("");
  }

  if (nombreUsuario!==""){
  return (

    
    <div className="menu">
      <h2>Nav Bar</h2>
      <p>Logueado como {nombreUsuario}.</p>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )}
  else {
    return (<div>
      <p>Debe iniciar sesión.</p>
    </div>)
  }
};

export default Menu;
