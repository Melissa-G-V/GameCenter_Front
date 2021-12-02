import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Conecta from "./Conecta";
import { ClienteContext } from "./ClienteContext";

const FormTwo = () => {
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
  useEffect(() => {
    getJogos();
  }, []);


  const onSubmit = async (data) => {
    console.log("data", data);
    axios.post('http://localhost:3001/jogos', {
        jnome: data.jnome,
        foto: data.foto,
        descricao: data.descricao,
        genero_id: data.genero_id
      })
      .then(function (response) {
        alert('Jogo Cadastrado Com Sucesso')
        console.log(response)
        getJogos()
        
      })
      .catch(function (error) {
        alert('Falha ao enviar o Item')
        console.log(error);
      });
   

  };
  return (
    <div className="form col-sm">
      <div className="card">
        <div className="card-header bg-primary">Postar Jogo</div>
        <div className="card-body bg-secondary">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="form-control"
                placeholder="jnome" defaultValue="Nome Jogo" {...register("jnome")} />
            {/* include validation with required or other standard HTML validation rules */}
            <input type="foto" className="form-control" placeholder="Url Foto"
                {...register("foto", {
                minLength: 10,
                })}/>
            <select className="form-control" id="genero_id"
            {...register("genero_id", {

                })}>
                <option value="1">Aventura</option>
                <option value="2">PointClick</option>
                <option value="3">Plataforma</option>
                <option value="4">RPG</option>
                <option value="5">FPS</option>
                <option value="6">Sandbox</option>
                <option value="7">Puzzle</option>
                <option value="8">Luta</option>
            </select>
            <input type="descricao" className="form-control" placeholder="descricao"
                {...register("descricao", {

                minLength: 10,
                })}/>

 <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;