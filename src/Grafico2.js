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
  const [generos, setGeneros] = useState([]);

  const getGeneros = async () => {
    const lista = await Conecta.get("estatistica");
    //    console.log(lista);
    setGeneros(lista.data);
  };

  // define o método que será executado após renderizar o componente
  useEffect(() => {
    getGeneros();
  }, []);

  const labels = generos.map((genero) => genero.nome);
  const data1 = generos.map((genero) => genero.num);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nº de Veículos por genero",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Nº de Jogos",
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
