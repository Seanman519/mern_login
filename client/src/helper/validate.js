import toast from 'react-hot-toast';

// validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values); // Change the function name to usernameVerify

  return errors;
}

// validate username
function usernameVerify(errors = {}, values) {
  if (!values.username) {
    errors.username = toast.error('Username Required...!');
  } else if (values.username.includes(" ")) {
    errors.username = toast.error('Invalid Username...!');
  }

  return errors;
}
