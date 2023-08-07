import toast from 'react-hot-toast';

// Validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}

// Validate login page password
export function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

// Validate username
function usernameVerify(errors = {}, values) {
  if (!values.username) {
    errors.username = toast.error('Username Required...!');
  } else if (values.username.includes(" ")) {
    errors.username = toast.error('Invalid Username...!');
  }

  return errors;
}

// Validate password
function passwordVerify(errors = {}, values) {
  if (!values.password) {
    errors.password = toast.error('Password Required...!');
  } else if (values.password.length < 6) {
    errors.password = toast.error('Password must be at least 6 characters...!');
  } else if (!/[\W_]/.test(values.password)) {
    errors.password = toast.error('Password must contain at least one special character...!');
  }

  return errors;
}

// Validate OTP input field
export function otpValidate(values) {
  const errors = {};

  if (!values.otp) {
    errors.otp = toast.error('OTP Required...!');
  } else if (!/^\d{6}$/.test(values.otp)) {
    errors.otp = toast.error('Invalid OTP...! Must be a six-digit number.');
  }

  return errors;
}

// // Validate login page username
// export function username1Validate(values) {
//   const errors = {};

//   if (!values.username) {
//     errors.username = toast.error('Username Required...!');
//   } else if (values.username.includes(' ')) {
//     errors.username = toast.error('Invalid Username...!');
//   }

//   return errors;
// }

// Validate email input field
export function emailValidate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = toast.error('Email Required...!');
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = toast.error('Invalid Email...! Please enter a valid email address.');
  }

  return errors;
}

// // Validate password input field
// export function passwordValidate(values) {
//   const errors = {};

//   if (!values.password) {
//     errors.password = toast.error('Password Required...!');
//   } else if (values.password.length < 8) {
//     errors.password = toast.error('Password should be at least 8 characters long.');
//   }

//   return errors;
// }