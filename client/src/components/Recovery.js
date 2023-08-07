import React from 'react';
// import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { otpValidate } from '../helper/validate';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } }
};

const glassMorphismVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(7.1px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: { delay: 0.2, duration: 0.5 }
  },
  hover: {
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    transition: { duration: 0.3 }
  }
};

const Recovery = () => {
  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validate: otpValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-blue-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        className="bg-white bg-opacity-25 shadow-xl rounded-3xl p-8"
        variants={glassMorphismVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <motion.div className="text-center">
          <h4 className="text-5xl font-bold text-white">Recovery</h4>
          <span className="py-4 text-xl text-white">
            Enter the six-digit OTP pin for recovery
          </span>
        </motion.div>

        <motion.div className="flex justify-center mt-8">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
            <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full" />
          </div>
        </motion.div>

        <form className="mt-8" onSubmit={formik.handleSubmit}>
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
          >
            <div className="flex flex-col items-center gap-4">
              <input
                {...formik.getFieldProps('otp')}
                type="text"
                placeholder="Enter OTP"
                className="w-64 rounded-lg px-4 py-2 outline-none bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm placeholder-white placeholder-opacity-75 focus:ring focus:ring-white focus:bg-opacity-100"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm rounded-lg text-white font-bold hover:bg-green-600 hover:bg-opacity-80 transition-all duration-300"
              >
                Verify OTP
              </button>
            </div>
          </motion.div>
        </form>

        <div className="text-center py-4 text-white">
          Can't get OTP?<button className="ml-1 text-red-500">Resend Now</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Recovery;
