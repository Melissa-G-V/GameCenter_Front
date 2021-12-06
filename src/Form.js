import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Conecta from "./Conecta";
import { ClienteContext } from "./ClienteContext";
import "./Form.css";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cliente = useContext(ClienteContext);

  const onSubmit = async (data) => {
    console.log("data", data);
    axios.post('http://localhost:3001/reviews2', {
        jogos_id: data.jogos_id,
        usuarios_id: cliente.dados.id,
        comentario: data.comentario,
        estrelas: data.estrelas,
      })
      .then(function (response) {
        console.log(response);
        alert('review postado com sucesso, para ver va para area de reviews')
      })
      .catch(function (error) {
        console.log(error);
        alert('Voce presisa estar logado para fazer um review')
      });
  };
  return (
    <div className="form col-sm">
      <div className="card">
        <div className="card-header">AvaliarJogo (precisa estar logado)</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="form-control" placeholder="commentario"
             {...register("comentario")} />
            {/* include validation with required or other standard HTML validation rules */}

            <input className="form-control" type="number" placeholder="id produto"
             {...register("jogos_id")} />
            {/* include validation with required or other standard HTML validation rules */}
            <input className="form-control" type="number" placeholder="Nº Estrelas"
             {...register("estrelas", { required: true, min: 1, max: 5, })} />
            {/* errors will return when field validation fails  */}
            {errors.estrelas && <span>This field is required</span>}
            <input className="button" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;