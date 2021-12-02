import React, { useContext } from "react";
import { ClienteContext } from "./ClienteContext";

import "./Item.css";
const ItemReview = (props) => {

  const cliente = useContext(ClienteContext);
  console.log(cliente)

const stars = (value) => {
    return(
     <div>
         {[...Array(value)].map(star =>{
             return   <i class="fas fa-star"></i>
         })}

     </div>

     )
}


  return (
<div class="card container my-2">
  <h5 class="card-header bg-primary">{props.jnome}</h5>
  <div class="card-body">
      <div className="row">
          <div className="col-4">
              <div className="container">
          <img className="card-img" src={props.foto} alt="Veículo em Destaque" />
          </div>
          </div>
          <div className="col-8">
          <ul className="list-group list-group-flush">
    <li className="list-group-item">Usuario: {props.nome}</li>
    <li className="list-group-item">Email: {props.email}</li>
    <li className="list-group-item">Commentario: "{props.comentario}"</li>
    <li className="list-group-item">Rating: {stars(props.estrelas)}</li>

  </ul>
            </div>
      </div>
    
    
  </div>
</div>
  );
};

export default ItemReview;