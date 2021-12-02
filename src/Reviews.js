import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Conecta from "./Conecta";
import { ClienteContext } from "./ClienteContext";
import ItemReview from "./ItemReview.js"

const Reviews = () => {
const [reviews, setReview] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cliente = useContext(ClienteContext);

  const getReviews = async () => {
    const lista = await Conecta.get("reviews");
    //    console.log(lista);
    setReview(lista.data);
  };
  useEffect(() => {
    getReviews();
  }, []);


  return (
<div className="row">
    {reviews.map((review, index) => (
      <ItemReview
        id={review.id}
        comentario={review.comentario}
        modelo={review.modelo}
        usuario_id={review.usuario_id}
        nome={review.nome}
        jnome={review.jnome}
        foto={review.foto}
        email={review.email}
        estrelas={review.estrelas}
        key={review.id} />
    ))}
  </div>


  );
};
export default Reviews;