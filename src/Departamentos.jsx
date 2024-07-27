import { useState, useEffect } from "react";
import Departamento from "./Departamento";

const Departamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [esperando, setEsperando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://babytracker.develotion.com//departamentos.php")
      .then((res) => {
        if (!res.ok) {
          throw Error("no se pudo obtener datos desde el recurso");
        }
        return res.json();
      })
      .then((datos) => {
        setDepartamentos(datos.departamentos);
        setEsperando(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setEsperando(false);
      });
  }, []);

  if (esperando) {
    return <p>Esperando datos...</p>;
  } else {
    if (departamentos !== null) {
      return (
        <div>
          <div>
            {departamentos.map((departamento) => (
              <Departamento key={departamento.id} {...departamento} />
            ))}
          </div>
          <br></br>
        </div>
      );
    }
  }
};

export default Departamentos;
