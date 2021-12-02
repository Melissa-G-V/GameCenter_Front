import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Conecta from "./Conecta";
import { ClienteContext } from "./ClienteContext";

const FormTwo = () => {
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
  useEffect(() => {
    getCarros();
  }, []);


  const onSubmit = async (data) => {
    console.log("data", data);
   
    axios.post('http://localhost:3001/carros', {
        modelo: data.modelo,
        foto: data.foto,
        ano: data.ano,
        preco: data.preco,
        marca_id: data.marca_id
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
   

  };
  return (
    <div className="form col-sm">
      <div className="card">
        <div className="card-header bg-primary">POSTAR VEICULO</div>
        <div className="card-body bg-secondary">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="form-control"
                placeholder="modelo" defaultValue="modelo" {...register("modelo")} />
            {/* include validation with required or other standard HTML validation rules */}
            <input type="foto" className="form-control" placeholder="Url Foto"
                {...register("foto", {
                required: true,
                minLength: 10,
                })}/>
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
                 })}/>
            <input
                type="number"
                className="form-control"
                placeholder="ano"
                {...register("ano", {
                     required: true,
                    min: 1000,
                    max: 2023,
                 })}/>

 <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;