import React, { useEffect, useState } from "react";
import cl from "./Registration.module.scss";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../../redux/reducers/authApi";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registration, { isError, error, isSuccess, isLoading }] =
    useRegistrationMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className={cl.login}>
      <div className={cl.login__form}>
        <h1>Sign up</h1>
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
          <Link to="/login">Логин</Link>
        </div>
        {isError && <p className={cl.error}>{error.data.message}</p>}
        {isLoading && <p className={cl.loading}>Загрузка...</p>}
        {isSuccess && <p className={cl.success}>Вы успешно зарегестрированы</p>}
        <Button
          onClick={() => {
            registration({ email, password });
          }}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default RegistrationPage;
