import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./style.css";
import LoginInput from '../../components/inputs/loginInput';

const loginInfo = {
  email: "",
  password: ""
}

const Login = () => {
  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value
    })
  }

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string()
      .required("Password is required")
  })

  return (
    <div className='login'>
      <div className='login_1_wrap'>
        <div className='login_1'>
          <img src="../../icons/facebook.svg" alt="" />
          <span>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className='login_1'>
          <div className='login_2_wrap'>
            <Formik
              initialValues={{
                email,
                password
              }}
              validationSchema={loginValidation}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    placeholder="Email address or phone number"
                    type="text"
                    name="email"
                    onChange={handleLoginChange}
                  />
                  <LoginInput
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={handleLoginChange}
                    bottom
                  />
                  <button type="submit" className='blue_btn'>Log in</button>
                </Form>
              )}
            </Formik>
            <Link to="/forgot" className='forgot_password'>Forgot your password?</Link>
            <div className='sign_splitter'></div>
            <button className='blue_btn open_signup'>Create account</button>
          </div>
          <Link to="/">
            <b>Create a Page</b>
            for a celebrite, brand or business
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;