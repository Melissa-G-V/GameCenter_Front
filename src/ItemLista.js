import React, { useContext } from "react";
import { ClienteContext } from "./ClienteContext";
import Form from "./Form.js";
const ItemLista = (props) => {

  const cliente = useContext(ClienteContext);
  console.log(cliente)

  let likeButtons;
  if (cliente.dados.id) {
    likeButtons = (
      <>
      <div className="container">

        <span className="float-right" onClick={props.delClick}>
          <i class="fas fa-trash"></i>
        </span>
        <span className="button " onClick={props.FavClick}>
         Favoritar
            { props.destaque ? (<span className="badge bg-success ml-2"><i className="fas fa-heart fa-lg"></i></span> ): (<span className="badge bg-danger ml-2"><i className="fas fa-heart-broken fa-lg"></i></span>)}
        </span>
      
      </div>
      </>
    );
  }

  return (
    <div className="card col-sm-3 col-6 my-2 mx-2">
      <p>{props.id}</p>
      <img className="card-img-top" src={props.foto} alt="Veículo em Destaque" />
      <div className="card-body">
        <h4 className="card-title">
          {props.marca} {props.modelo} ({props.ano})
        </h4>
        <p className="card-text">
          Preço R$: &nbsp;
          {Number(props.preco).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}
        </p>
        {likeButtons}
      </div>
    </div>
  );
};

export default ItemLista;