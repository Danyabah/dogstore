import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeToken } from "../redux/slices/userReducer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SignIn() {
  const [body, setBody] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["signIn"],
    queryFn: async () => {
      const res = await fetch("https://api.react-learning.ru/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responce = await res.json();

      return responce;
    },
    enabled: body !== undefined,
  });
  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  if (!isLoading) {
    localStorage.setItem("token", data.token);
    dispatch(changeToken(data.token));
    navigate("/");
  }

  const handleSubmit = async (values) => {
    // console.log(values);
    // const email = e.target[0].value;
    // const password = e.target[1].value;

    setBody(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="formContainer">
            <div className="formWrapper">
              <span className="logo">DogStore</span>
              <span className="title">Авторизация</span>
              <Form>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Пароль"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
                <button
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                  disabled={!(dirty && isValid)}
                >
                  Войти
                </button>
              </Form>
              <p>
                У вас нет аккаунта? <Link to="/register">Регистрация</Link>{" "}
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
