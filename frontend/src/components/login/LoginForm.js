import * as Yup from "yup";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

import Footer from './Footer';
import LoginInput from '../inputs/loginInput';
import axios from "axios";


const loginInfo = {
  email: "",
  password: ""
}

const LoginForm = ({ setVisible }) => {
  const [login, setLogin] = useState(loginInfo);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidation}
                onSubmit={async () => {
                  try {
                    setLoading(true);
                    const { data } = await axios.post(
                      `${process.env.REACT_APP_BACKEND_URL}/login`,
                      {
                        email,
                        password
                      }
                    )
                    setLoading(false);
                    setError("");
                    setSuccess(data.message);
                    setTimeout(() => {
                      dispatch({ type: "LOGIN", payload: data });
                      Cookies.set("user", data);
                      navigate("/");
                    }, 2000);
                  } catch (error) {
                    setLoading(false);
                    setError(error.response?.data.message);
                  }
                }}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email address or phone number"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                      bottom
                    />
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgotten password?
              </Link>
              <DotLoader color="#1876f2" size={30} loading={loading} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup" onClick={() => setVisible(true)}>Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page</b> for a celebrity, brand or business.
            </Link>
          </div>
        </div>
        <div className="register"></div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginForm;