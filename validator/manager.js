import validator from "validator";

export function validateManagerCreate({ email, password, name, contactNumber }, setErrors) {
  const errors = {};
  if (!email) {
    errors.email = "Email address is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (!name) {
    errors.name = "Manager name is required";
  } else if (name.length < 3) {
    errors.name = "Manager name must be at least 3 charecters long";
  }
  if (!contactNumber) {
    errors.contactNumber = "Contact number is required";
  }

  setErrors(errors);

  return Object.keys(errors).length === 0;
}

export function validateManagerInfo({ email, name, contactNumber }, setErrors) {
  const errors = {};

  if (!email) {
    errors.email = "Email address is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }

  if (!name) {
    errors.name = "Manager name is required";
  } else if (name.length < 3) {
    errors.name = "Manager name must be at least 3 charecters long";
  }

  if (!contactNumber) {
    errors.contactNumber = "Contact number is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}

export function validatePassword({ password }, setErrors) {
  const errors = {};

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
