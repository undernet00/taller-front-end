import { useState } from "react";
import "./App.css";
import Eventos from "./Eventos";
import Login from "./Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
      <Eventos />
    </>
  );
}

export default App;
