import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCurrentItem } from "../redux/slices/cartReducer";
import Add from "./svg/Add";
import { Link } from "react-router-dom";
import {
  dislikeItem,
  likeItem,
  selectCurrentLikeItem,
} from "../redux/slices/likeReducer";

export default function Product({
  _id,
  price,
  pictures,
  name,
  available,
  discount,
  stock,
}) {
  const obj = { _id, price, pictures, name, available, discount, stock };
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem(_id));
  const currentLike = useSelector(selectCurrentLikeItem(_id));
  const [like, setLike] = useState(currentLike ? true : false);

  function handleAddItem() {
    dispatch(addItem(obj));
  }

  function handleLike() {
    dispatch(likeItem(obj));
    setLike(true);
  }

  function handleDislike() {
    dispatch(dislikeItem(obj));
    setLike(false);
  }

  return (
    <div className="product-block">
      {like ? (
        <div className="btn btn-d" onClick={handleDislike}>
          <i className="uil uil-heart"></i>
        </div>
      ) : (
        <div className="btn" onClick={handleLike}>
          <i className="uil uil-heart"></i>
        </div>
      )}
      <Link to={`/product/${_id}`}>
        <img className="product-block__image" src={pictures} alt="Pizza" />
      </Link>
      <h4 className="product-block__title">{name}</h4>
      <div className="product-block__selector">
        <ul>
          <li>{available ? "Есть в наличии" : "Товар закончился"}</li>
        </ul>
        <ul>
          <li>{discount !== 0 ? `Скидка : ${discount} %` : "Конечная цена"}</li>
        </ul>
      </div>
      <div className="product-block__bottom">
        <div className="product-block__price">{price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={handleAddItem}
          disabled={currentItem?.count === stock}
        >
          <Add />
          <span>Добавить</span>
          {currentItem && <i>{currentItem.count}</i>}
        </button>
      </div>
    </div>
  );
}
