import React from 'react';

import "./style.css";
import RegisterForm from "../../components/login/RegisterForm";
import LoginForm from '../../components/login/LoginForm';

const Login = () => {
  return (
    <>
      <LoginForm />
      <RegisterForm />
    </>
  );
};

export default Login;