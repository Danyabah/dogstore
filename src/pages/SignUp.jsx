import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const group = e.target[1].value;
    const password = e.target[2].value;
    console.log(displayName);
    console.log(group);
    console.log(password);
    try {
      //Create user
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      //  navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DogStore</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Логин" />
          <input type="text" placeholder="Группа" />
          <input type="password" placeholder="Пароль" />
          <button>Зарегистрироваться</button>
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
