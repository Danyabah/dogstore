import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = e.target[0].value;
    const password = e.target[1].value;
    console.log(login);
    console.log(password);
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DogStore</span>
        <span className="title">Авторизация</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Логин" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          У вас нет аккаунта? <Link to="/register">Регистрация</Link>{" "}
        </p>
      </div>
    </div>
  );
}
