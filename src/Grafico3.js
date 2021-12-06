

import React, { useState, useEffect } from "react";
import Conecta from "./Conecta";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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
        backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 124, 111, 145)',
        'rgba(255, 178, 128, 255)'
    ]
      },
    ],
  };

  return (
    <div class="d-flex justify-content-center">
      <div style={{ width: "30%" }}>
        <Pie options={options} data={data} />
      </div>
    </div>
  );
};

export default Grafico2;

