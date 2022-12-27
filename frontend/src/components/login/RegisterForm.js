import axios from 'axios';
import * as Yup from "yup";
import Cookie from "js-cookie";
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

import RegisterInput from '../inputs/registerInput';

const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

const RegisterForm = ({ setVisible }) => {
  const [user, setUser] = useState(userInfos);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender
  } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(108), (val, index) => bYear - index);
  const months = Array.from(new Array(12), (val, index) => index + 1)
  const days = Array.from(new Array(31), (val, index) => index + 1)

  const registerValidation = Yup.object({
    first_name: Yup.string().required("What's your First name?")
      .min(2, 'First name must be between 2 and 16 characters')
      .max(16, 'First name must be between 2 and 16 characters')
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string().required("What's your Last name?")
      .min(2, 'Last name must be between 2 and 16 characters')
      .max(16, 'Last name must be between 2 and 16 characters')
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    email: Yup.string().required("You'll need this when you login and if you ever need to reset your password")
      .email("Enter a valid email address"),
    password: Yup.string().required("Enter a combination of atleast six numbers, letters and punctuation marks(such as ! and &)")
      .min(6, "Password must be atleast 6 characters")
      .max(36, "Password can't be more than 36 characters")
  })

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender
          }}
          validationSchema={registerValidation}
          onSubmit={async () => {
            try {
              const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                first_name,
                last_name,
                email,
                password,
                bYear,
                bMonth,
                bDay,
                gender
              })
              setError("");
              setSuccess(data.message);
              const { message, ...restData } = data;
              setTimeout(() => {
                dispatch({ type: "LOGIN", payload: restData });
                Cookie.set("user", JSON.stringify(restData));
                navigate("/");
              }, 2000);
            } catch (error) {
              setLoading("");
              setSuccess("");

            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                  value={user.first_name}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                  value={user.last_name}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  value={user.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  value={user.password}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay" value={bDay} onChange={handleRegisterChange}>
                    {days.map(day => (
                      <option value={day} key={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
                    {months.map(month => (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="bYear" value={bYear} onChange={handleRegisterChange}>
                    {years.map(year => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                      defaultChecked
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" style={{ height: 45 }}>Sign Up</button>
              </div>
              <DotLoader color="#1876f2" size={30} loading={loading} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>

      </div>
    </div >
  );
};

export default RegisterForm;