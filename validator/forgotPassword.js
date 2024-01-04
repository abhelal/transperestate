import validator from "validator";

export default function validateEmail({ email }, setErrors) {
  const errors = {};
  if (!email) {
    errors.email = "Email address is required";
  }
  if (email && !validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }
  setErrors(errors);
  return Object.keys(errors).length === 0;
}
