import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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
  return (
    <div className="card">
      <h4>{props.titulo}</h4>
      <Bar
        options={options}
        data={{
          labels: props.datos.etiquetas,
          datasets: [
            {
              label: props.categoriasNombre,
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
