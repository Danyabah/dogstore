import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, selectCurrentItem } from "../redux/slices/cartReducer";
import Add from "./svg/Add";
import {
  dislikeItem,
  likeItem,
  selectCurrentLikeItem,
} from "../redux/slices/likeReducer";
import Review from "./Review";
import { errorAlert } from "../utils/errorAlert";
import { clearSearch } from "../redux/slices/searchReducer";

export default function FullProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLike = useSelector(selectCurrentLikeItem(id));

  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem(id));

  const getProduct = async () => {
    const res = await fetch(`https://api.react-learning.ru/products/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const responce = await res.json();
    return responce;
  };

  const { data, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
  });

  if (isError) {
    errorAlert("Продукт не найден");
    navigate("/");
  }

  return (
    <div className="container container--full">
      <div className="full">
        <div className="full--left">
          <h2>{data?.name}</h2>
          <img src={data?.pictures} alt="pizza" />
          <div>{data?.price} ₽</div>
          <div className="full__btn">
            <Link
              to="/"
              onClick={() => dispatch(clearSearch())}
              className="button button--black"
            >
              <span>Назад</span>
            </Link>
          </div>
        </div>
        <div className="full--right">
          <div>
            Информация:
            <ul>
              <li>{data?.available ? "В наличии" : "Нет в наличии"}</li>
              <li dangerouslySetInnerHTML={{ __html: data?.description }}></li>
              <li>Кол-во на складе: {data?.stock}</li>
              <li>Вес: {data?.wight}</li>
              {data?.discount !== 0 ? <li>Скидка: {data?.discount}%</li> : ""}
            </ul>
          </div>
          <div
            className="button button--outline button--add"
            onClick={() => dispatch(addItem(data))}
          >
            <Add />
            <span>В корзину</span>
            {currentItem && <i>{currentItem.count}</i>}
          </div>
          {currentLike ? (
            <div
              className="btn btn-d"
              onClick={() => dispatch(dislikeItem(data))}
            >
              <span>Убрать из избранного </span>
              <i className="uil uil-heart"></i>
            </div>
          ) : (
            <div className="btn" onClick={() => dispatch(likeItem(data))}>
              <span>Добавить в избранное </span>
              <i className="uil uil-heart"></i>
            </div>
          )}
        </div>
      </div>
      <div>
        <h1>Отзывы: </h1>
        <div className="review__container">
          {data?.reviews.map((obj) => {
            return <Review key={obj._id} {...obj} />;
          })}
        </div>
      </div>
    </div>
  );
}
