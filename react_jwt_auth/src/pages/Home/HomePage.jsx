import React from "react";
import cl from "./Home.module.scss";
import { authApi, useLogoutMutation } from "../../redux/reducers/authApi";
import { userApi } from "../../redux/reducers/userApi";

const HomePage = () => {
  const [refresh, {}] = authApi.endpoints.refresh.useLazyQuery();
  const [getUsers, { data }] = userApi.endpoints.getUsers.useLazyQuery();
  const [logout, {}] = useLogoutMutation();
  return (
    <div className={cl.home}>
      <button onClick={() => refresh()}>Refresh</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => getUsers()}>Get users</button>
    </div>
  );
};

export default HomePage;
