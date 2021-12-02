import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Conecta from "./Conecta";
import ItemLista from "./ItemLista";
import { ClienteContext } from "./ClienteContext";

const Listagem = () => {
  const [jogos, setJogos] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cliente = useContext(ClienteContext);

  const getJogos = async () => {
    const lista = await Conecta.get("jogos");
    //    console.log(lista);
    setJogos(lista.data);
  };

  // define o método que será executado após renderizar o componente
  useEffect(() => {
    getJogos();
  }, []);
// define o método que será executado após renderizar o componente

  const clienteLike = async (id, index) => {
    
    let voto = {
      usuario_id: cliente.dados.id,
      jogo_id: id,
      gostou: 1,
    };

    const config = {
      headers: { Authorization: `Bearer ${cliente.dados.token}` },
    };

    await Conecta.post("likes", voto, config);

    // Obtém o registro (para saber a quantidade de likes da tabela jogos)
    const reg = await Conecta.get("jogos/" + id);
    //console.log(reg)

    let likes = Number(reg.data.likes) + 1;

    // altera a quantidade de likes no WebServices
    await Conecta.put("jogos/like/" + id);

    // atualiza o array
    let newjogos = [...jogos];
    newjogos[index].likes = likes;
    setJogos(newjogos);

    alert("Ok! Obrigado pela sua participação");
  };


//DELETA O jogo
  const DelCar = async (id) =>{
    await Conecta.delete("jogos/" + id);
    alert("Item Deletado")
    await getJogos();
  }
//FAVORITA O jogo
  const FavCar = async (id) =>{
    await Conecta.put("jogos/destaque/" + id)
    alert("Item Favoritado")
    await getJogos();
  }
//PESQUISA O jogo
  const onSubmit = async (data)=>{
      console.log("data", data);
      const propertyNames = Object.values(data);
      console.log(propertyNames[0])

      axios.post(`http://localhost:3001/jogos/pesq/${propertyNames[0]}`,{})
        .then(function (response) {
          alert(`Pesquisa escrita com a palavra: ${propertyNames[0]}`)
          console.log(response);
          setJogos(response.data)
        })
        .catch(function (error) {
          alert('Pesquisa mal escrita, retornando a lista original')
          console.log(error);
          getJogos();
        });
   };

//ENVIA O FORM jogoS
   const onSubmit2 = async (data2) => {
    console.log("data", data2);
   
    axios.post('http://localhost:3001/jogos', {
        modelo: data2.modelo,
        foto: data2.foto,
        ano: data2.ano,
        preco: data2.preco,
        marca_id: data2.marca_id
      })
      .then(function (response) {
        alert('Item Cadastrado Com Sucesso')
        console.log(response)
        getJogos()
        
      })
      .catch(function (error) {
        alert('Falha ao enviar o Item')
        console.log(error);
      });
    }
//ATENÇÂO AO DATA 2 E AO SUBMIT2
  


  return (
<div className="container">
        <div className="container-fluid my-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <input type="text" className="form-control rounded" placeholder="Search"
                id="palavra"
                {...register("palavra")} />
              <button type="submit" className="btn btn-outline-primary">search</button>
            </div>
          </form>
        </div>
        <div className="row">
          {jogos.map((jogo, index) => (
            <ItemLista
              id={jogo.id}
              foto={jogo.foto}
              jnome={jogo.jnome}
              genero={jogo.genero}
              descricao={jogo.descricao}
            
              destaque={jogo.destaque}
              FavClick={() => FavCar(jogo.id)}
              delClick={() => DelCar(jogo.id)}
            

              key={jogo.id} />
          ))}
        </div>
      </div>
  );
};

export default Listagem;
