export const HEADER_API_KEY = "apikey";
export const HEADER_ID_USUARIO = "iduser";
export const JSON_HEADER = { "Content-Type": "application/json" };

export const URL_LOGIN = "https://babytracker.develotion.com//login.php";

export const URL_CATEGORIAS =
  "https://babytracker.develotion.com//categorias.php";

export const URL_CIUDADES =
  "https://babytracker.develotion.com//ciudades.php?idDepartamento=";

export const URL_DEPARTAMENTOS =
  "https://babytracker.develotion.com//departamentos.php";

export const URL_EVENTOS_GET =
  "https://babytracker.develotion.com//eventos.php?idUsuario=";

export const URL_EVENTOS_DELETE =
  "https://babytracker.develotion.com//eventos.php?idEvento=";

export const URL_EVENTOS_POST =
  "https://babytracker.develotion.com//eventos.php";

export const URL_REGISTRO = "https://babytracker.develotion.com//usuarios.php";

export const OpcionesParaGET = (apiKey, idUsuario) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(HEADER_API_KEY, apiKey);
  headers.append(HEADER_ID_USUARIO, idUsuario);

  return {
    method: "GET",
    headers: headers,
  };
};

export const OpcionesParaPOST = (body, apiKey, idUsuario) => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(HEADER_API_KEY, apiKey);
  headers.append(HEADER_ID_USUARIO, idUsuario);

  return {
    method: "POST",
    headers: headers,
    body: body,
  };
};

export const OpcionesParaDELETE = (apiKey, idUsuario) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(HEADER_API_KEY, apiKey);
  headers.append(HEADER_ID_USUARIO, idUsuario);

  return {
    method: "DELETE",
    headers: headers,
  };
};
