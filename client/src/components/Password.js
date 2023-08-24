import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';

const Password = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // Here, you can add any logic for handling the password, like API calls.
      console.log(values);

      // Redirect to Profile route
      navigate('/profile');
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg shadow-xl rounded-3xl p-8">
        <div className="text-center">
          <h4 className="text-5xl font-bold text-white">Password</h4>
          <span className="py-4 text-xl text-white">Gimme your password</span>
        </div>

        <div className="flex justify-center mt-8">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
            <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full" />
          </div>
        </div>

        <form className="mt-8" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4">
              <input
                {...formik.getFieldProps('password')}
                type="password"
                placeholder="Password"
                className="w-64 rounded-lg px-4 py-2 outline-none bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm placeholder-white placeholder-opacity-75 focus:ring focus:ring-white focus:bg-opacity-100"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm rounded-lg text-white font-bold hover:bg-green-600 hover:bg-opacity-80 transition-all duration-300"
              >
                Signin
              </button>
            </div>
          </div>
        </form>

        <div className="text-center py-4 text-white">
          Forgot your password?<Link className="ml-1 text-red-500" to="/recovery">Recover now</Link>
        </div>
      </div>
    </div>
  );
};

export default Password;
