import React, { useEffect, useState } from "react";
import cl from "./Registration.module.scss";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../../redux/reducers/authApi";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    login: "",
    password: "",
    password_two: "",
  });
  const [passwordMatches, setPasswordMatches] = useState(true);
  const [registration, { isError, error, isSuccess, isLoading }] =
    useRegistrationMutation();

  const registrationHandler = () => {
    if (state.password === state.password_two) {
      registration(state);
      setPasswordMatches(true);
    } else {
      setPasswordMatches(false);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className={cl.login}>
      <div className={cl.login__form}>
        <h1>Регистрация</h1>
        <Input
          type="text"
          placeholder="Имя пользователя"
          onChange={(e) => setState({ ...state, username: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Логин"
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Подтвердите пароль"
          onChange={(e) => setState({ ...state, password_two: e.target.value })}
        />

        {isError && <p className={cl.error}>{error.data.message}</p>}
        {!passwordMatches && <p className={cl.error}>Пароди не совпадают</p>}
        {isLoading && <p className={cl.loading}>Загрузка...</p>}
        {isSuccess && <p className={cl.success}>Вы успешно зарегестрированы</p>}
        <Button
          onClick={() => {
            registrationHandler();
          }}
        >
          Зарегестрироваться
        </Button>

        <div className={cl.link}>
          <span>
            Уже есть аккаунт <br />
          </span>
          <Link to="/login">Вход</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
