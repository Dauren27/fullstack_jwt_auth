import React from "react";
import cl from "./Input.module.scss";

const Input = ({ ...props }) => {
  return <input className={cl.input} {...props} autoComplete="new-password" />;
};

export default Input;
