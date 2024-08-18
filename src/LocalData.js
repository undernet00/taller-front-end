//Local Storage Keys
export const LOCAL_API_KEY = "apikey";
export const LOCAL_USUARIO = "usuario";
export const LOCAL_ID_USUARIO = "idusuario";

export const EstaLogueado = () => {
  let datos = LeerDatos();
  return (
    datos.apikey !== "" && datos.idUsuario !== "" && datos.nombreUsuario !== ""
  );
};

export const LeerDatos = () => {
  let apikey = window.localStorage.getItem(LOCAL_API_KEY);
  let idUsuario = window.localStorage.getItem(LOCAL_ID_USUARIO);
  let nombreUsuario = window.localStorage.getItem(LOCAL_USUARIO);

  if (nombreUsuario === null || apikey === null || idUsuario === null) {
    InicializarData();
    apikey = "";
    idUsuario = "";
    nombreUsuario = "";
  }

  return { apikey: apikey, idUsuario: idUsuario, nombreUsuario: nombreUsuario };
};

export const InicializarData = () => {
  window.localStorage.setItem(LOCAL_USUARIO, "");
  window.localStorage.setItem(LOCAL_API_KEY, "");
  window.localStorage.setItem(LOCAL_ID_USUARIO, "");
};

export const GuardarDatos = (apiKey, idUsuario, nombreUsuario) => {
  if (apiKey !== "" && idUsuario !== "" && nombreUsuario !== "") {
    window.localStorage.setItem(LOCAL_API_KEY, apiKey);
    window.localStorage.setItem(LOCAL_ID_USUARIO, idUsuario);
    window.localStorage.setItem(LOCAL_USUARIO, nombreUsuario);
  }
};
