import { useState } from "react";

const Combo = (props) => {
  const [itemSeleccionado, setitemSeleccionado] = useState("");

  return (
    <select
      value={itemSeleccionado}
      onChange={(e) => setitemSeleccionado(e.target.value)}
    >
      {props.lista.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nombre}{" "}
        </option>
      ))}
    </select>
  );
};

export default Combo;
