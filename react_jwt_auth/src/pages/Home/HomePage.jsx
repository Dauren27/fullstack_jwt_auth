import React from "react";
import cl from "./Home.module.scss";
import { authApi, useLogoutMutation } from "../../redux/reducers/authApi";
import { userApi } from "../../redux/reducers/userApi";
import Button from "../../components/UI/Button/Button";
import { useSelector } from "react-redux";
import { useState } from "react";

const HomePage = () => {
  const [refresh, refreshData] = authApi.endpoints.refresh.useLazyQuery();
  const [getUsers, { data, isSuccess, isLoading }] =
    userApi.endpoints.getUsers.useLazyQuery();
  const [logout, {}] = useLogoutMutation();
  const { user } = useSelector((state) => state.auth);
  const [unable, setUnable] = useState(
    user && user.email == "admin@gmail.com" ? true : false
  );
  return (
    <div className={cl.home}>
      <h1>Вы вошли в аккаунт</h1>
      <div className={cl.home__buttons}>
        <Button onClick={() => refresh()}>Обновить токен</Button>
        {refreshData.isSuccess && (
          <div>
            <p className={cl.success}>Токен доступа был успешно обновлен</p>
            <p className={cl.success} style={{ color: "#fff" }}>
              Новый токен доступа: ${refreshData.data.accessToken}
            </p>
          </div>
        )}
        {refreshData.isLoading && <p className={cl.loading}>Загрузка...</p>}
        <Button onClick={() => unable && getUsers()}>
          Получить всех пользователей
        </Button>
        {!unable && (
          <p className={cl.error}>Данная функия доступна только для админов</p>
        )}
        {isSuccess && (
          <div>
            <p className={cl.success} style={{ color: "#fff" }}>
              Список пользователей:
            </p>
            {data.map((user) => (
              <div>
                {user.username && (
                  <p className={cl.success} style={{ color: "#fff" }}>
                    {user.username}
                  </p>
                )}
                <p className={cl.success} style={{ color: "#fff" }}>
                  {user.email}
                </p>
              </div>
            ))}
          </div>
        )}
        {isLoading && <p className={cl.loading}>Загрузка...</p>}
        <Button onClick={() => logout()}>Выйти</Button>
      </div>
    </div>
  );
};

export default HomePage;
