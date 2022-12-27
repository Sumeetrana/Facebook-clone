import React, { useState } from 'react';

import "./style.css";
import RegisterForm from "../../components/login/RegisterForm";
import LoginForm from '../../components/login/LoginForm';

const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <LoginForm setVisible={setVisible} />
      {visible && <RegisterForm setVisible={setVisible} />}
    </>
  );
};

export default Login;