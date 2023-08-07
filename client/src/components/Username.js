import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { usernameValidate } from '../helper/validate';


const Username = () => {

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      console.log(values)
    }
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg shadow-xl rounded-3xl p-8">
        <div className="text-center">
          <h4 className="text-5xl font-bold text-white">Hello</h4>
          <span className="py-4 text-xl text-white">
            Explore more with us
          </span>
        </div>

        <form className="mt-8" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
              <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <input {...formik.getFieldProps('username')}
                type="text"
                placeholder="Username"
                className="w-64 rounded-lg px-4 py-2 outline-none bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm placeholder-white placeholder-opacity-75 focus:ring focus:ring-white focus:bg-opacity-100"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm rounded-lg text-white font-bold hover:bg-green-600 hover:bg-opacity-80 transition-all duration-300"
              >
                Let's go
              </button>
            </div>
          </div>
        </form>

        <div className="text-center py-4 text-white">
          Not a member<Link className="ml-1 text-red-500" to="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Username;
