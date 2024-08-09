import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const Grafica = (props) => {
  let titulo = props.titulo;
  useEffect(() => {
    options.plugins.title.text = titulo;
  }, []);


  return (
    <div className="card">
      <Bar
        options={options}
        data={{
          labels: props.datos.etiquetas,
          datasets: [
            {
              label: "Categorías",
              data: props.datos.valores,
              backgroundColor: props.color,
            },
          ],
        }}
      />
    </div>
  );
};

export default Grafica;
