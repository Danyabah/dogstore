import React, { useState } from "react";
import logoSvg from "../img/v987-11a.jpg";
export default function Home() {
  const [status, setStatus] = useState(false);
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="dog logo" />
            <div>
              <h1>Dog Store</h1>
              <p>самые лучшие товары для собак</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="content">
          {status === "error" ? (
            <div className="content__error">
              <h2>
                Ничего не найден<span>😕</span>
              </h2>
              <p>
                Вероятней всего, произошла ошибка.
                <br />
                Попробуйте повторить попытку позже.
              </p>
            </div>
          ) : (
            <>
              <h2 className="content__title">Все товары</h2>
              <div className="content__items">
                {/* {status === "loading" ? skeletons : pizzas} */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
