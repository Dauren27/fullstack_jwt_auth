import React, { useEffect, useState } from "react";
import cl from "./Login.module.scss";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { authApi, useLoginMutation } from "../../redux/reducers/authApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isError, error, isSuccess, isLoading, data }] =
    useLoginMutation();
  const [refresh, {}] = authApi.endpoints.refresh.useLazyQuery();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    await login({ email, password });
  };
  useEffect(() => {
    if (isSuccess) {
      refresh();
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <div className={cl.login}>
      <div className={cl.login__form}>
        <h1>Sign in</h1>
        <Input
          type="text"
          placeholder="Логин"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={cl.link}>
          <Link to="/registration">Регистрация</Link>
        </div>
        {isError && <p className={cl.error}>{error?.data?.message}</p>}
        {isLoading && <p className={cl.loading}>Загрузка...</p>}
        {isSuccess && <p className={cl.success}>Вы успешно авторизовались</p>}
        <Button onClick={loginHandler}>Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;
