import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Conecta from "./Conecta";
import ItemLista from "./ItemLista";
import { ClienteContext } from "./ClienteContext";

const Listagem = () => {
  const [carros, setCarros] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
// define o método que será executado após renderizar o componente

  const clienteLike = async (id, index) => {
    
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


//DELETA O CARRO
  const DelCar = async (id) =>{
    await Conecta.delete("carros/" + id);
    alert("Item Deletado")
    await getCarros();
  }
//FAVORITA O CARRO
  const FavCar = async (id) =>{
    await Conecta.put("carros/destaque/" + id)
    alert("Item Favoritado")
    await getCarros();
  }
//PESQUISA O CARRO
  const onSubmit = async (data)=>{
      console.log("data", data);
      const propertyNames = Object.values(data);
      console.log(propertyNames[0])

      axios.post(`http://localhost:3001/carros/pesq/${propertyNames[0]}`,{})
        .then(function (response) {
          alert(`Pesquisa escrita com a palavra: ${propertyNames[0]}`)
          console.log(response);
          setCarros(response.data)
        })
        .catch(function (error) {
          alert('Pesquisa mal escrita, retornando a lista original')
          console.log(error);
          getCarros();
        });
   };

//ENVIA O FORM CARROS
   const onSubmit2 = async (data2) => {
    console.log("data", data2);
   
    axios.post('http://localhost:3001/carros', {
        modelo: data2.modelo,
        foto: data2.foto,
        ano: data2.ano,
        preco: data2.preco,
        marca_id: data2.marca_id
      })
      .then(function (response) {
        alert('Item Cadastrado Com Sucesso')
        console.log(response)
        getCarros()
        
      })
      .catch(function (error) {
        alert('Falha ao enviar o Item')
        console.log(error);
      });
    }
//ATENÇÂO AO DATA 2 E AO SUBMIT2
  


  return (
    <><div className="form col-sm">
      <div className="card">
        <div className="card-header bg-primary">ENVIAR VEICULO</div>
        <div className="card-body bg-secondary">
          <form onSubmit={handleSubmit(onSubmit2)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="form-control"
              placeholder="modelo" defaultValue="modelo" {...register("modelo")} />
            {/* include validation with required or other standard HTML validation rules */}
            <input type="foto" className="form-control" placeholder="Url Foto"
              {...register("foto", {
                required: true,
                minLength: 10,
              })} />
            <select className="form-control" id="marca_id"
              {...register("marca_id", {
                required: true,
              })}>
              <option value="1">Renault</option>
              <option value="2">Fiat</option>
              <option value="3">Chevrolet</option>
              <option value="4">Ford</option>
              <option value="5">Voltswagen</option>
              <option value="6">Honda</option>
              <option value="7">Peugout</option>
              <option value="8">Hyundai</option>
            </select>
            <input
              type="number"
              className="form-control "
              placeholder="preco"
              {...register("preco", {
                required: true,
                min: 1,
                max: 1000000,
              })} />
            <input
              type="number"
              className="form-control"
              placeholder="ano"
              {...register("ano", {
                required: true,
                min: 1000,
                max: 2023,
              })} />

            <input type="submit" />
          </form>
        </div>
      </div>
    </div><div className="container">
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
          {carros.map((carro, index) => (
            <ItemLista
              id={carro.id}
              foto={carro.foto}
              modelo={carro.modelo}
              marca={carro.marca}
              preco={carro.preco}
              ano={carro.ano}
              destaque={carro.destaque}
              FavClick={() => FavCar(carro.id)}
              delClick={() => DelCar(carro.id)}
              likeClick={() => clienteLike(carro.id, index)}

              key={carro.id} />
          ))}
        </div>
      </div></>
  );
};

export default Listagem;
