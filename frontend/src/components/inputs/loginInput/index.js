import React from 'react';
import { ErrorMessage, useField } from 'formik';

import "./style.css";

const LoginInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='input_wrap'>
      {meta.touched && meta.error && !bottom && <div className='input_error'>
        <ErrorMessage name={field.name} />
        <div className='error_arrow_top'></div>
      </div>}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props} />
      {meta.touched && meta.error && bottom && <div className='input_error'>
        <ErrorMessage name={field.name} />
        <div className='error_arrow_bottom'></div>

      </div>}
      {meta.touched && meta.error && <i style={{ top: `${!bottom && "63%"}` }} className='error_icon'></i>}
    </div>
  );
};

export default LoginInput;