import React, { useState, useEffect } from "react";
import Conecta from "./Conecta";

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

const Grafico2 = () => {
  const [marcas, setMarcas] = useState([]);

  const getMarcas = async () => {
    const lista = await Conecta.get("marcas_carros");
    //    console.log(lista);
    setMarcas(lista.data);
  };

  // define o método que será executado após renderizar o componente
  useEffect(() => {
    getMarcas();
  }, []);

  const labels = marcas.map((marca) => marca.nome);
  const data1 = marcas.map((marca) => marca.num);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nº de Veículos por Marca",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Nº de Veículos",
        data: data1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div class="d-flex justify-content-center">
      <div style={{ width: "1000px", height: "800px" }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Grafico2;
