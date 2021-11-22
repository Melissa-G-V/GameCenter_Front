import React, { useState, useEffect, useContext } from "react";
import Conecta from "./Conecta";
import ItemLista from "./ItemLista";
import { ClienteContext } from "./ClienteContext";

const Listagem = () => {
  const [carros, setCarros] = useState([]);
  const cliente = useContext(ClienteContext);

  const getCarros = async () => {
    const lista = await Conecta.get("carros");
    //    console.log(lista);
    setCarros(lista.data);
  };

  // define o método que será executado após renderizar o componente
  useEffect(() => {
    getCarros();
  }, []);

  const jaAvaliou = async (carroId) => {
    const like = await Conecta.get(`likes/pesq/${cliente.dados.id}/${carroId}`);
    return like.data.length;
  };

  const clienteLike = async (id, index) => {
    if (await jaAvaliou(id)) {
      alert("Ops... você já avaliou esse Veículo");
      return;
    }

    let voto = {
      usuario_id: cliente.dados.id,
      carro_id: id,
      gostou: 1,
    };

    const config = {
      headers: { Authorization: `Bearer ${cliente.dados.token}` },
    };

    await Conecta.post("likes", voto, config);

    // Obtém o registro (para saber a quantidade de likes da tabela carros)
    const reg = await Conecta.get("carros/" + id);
    //console.log(reg)

    let likes = Number(reg.data.likes) + 1;

    // altera a quantidade de likes no WebServices
    await Conecta.put("carros/like/" + id);

    // atualiza o array
    let newCarros = [...carros];
    newCarros[index].likes = likes;
    setCarros(newCarros);

    alert("Ok! Obrigado pela sua participação");
  };

  const clienteDislike = async (id) => {
    if (await jaAvaliou(id)) {
      alert("Ops... você já avaliou esse Veículo");
      return;
    }

    let voto = {
      usuario_id: cliente.dados.id,
      carro_id: id,
      gostou: 0,
    };

    await Conecta.post("likes", voto);

    // altera a quantidade de likes no WebServices
    await Conecta.put("carros/dislike/" + id);

    // atualiza o array, a partir da consulta que obtém todos os dados (já atualizados)
    await getCarros();

    alert("Ok! Obrigado pela sua participação");
  };

  return (
    <div className="container">
      <div className="row">
        {carros.map((carro, index) => (
          <ItemLista
            foto={carro.foto}
            modelo={carro.modelo}
            marca={carro.marca}
            preco={carro.preco}
            ano={carro.ano}
            likes={carro.likes}
            dislikes={carro.dislikes}
            likeClick={() => clienteLike(carro.id, index)}
            dislikeClick={() => clienteDislike(carro.id)}
            key={carro.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Listagem;
