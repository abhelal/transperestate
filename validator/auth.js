import validator from "validator";

export function validateRegister({ name, email, password, confirmPassword, companyName }, setErrors) {
  const errors = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 charecters long";
  }

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

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (companyName && companyName.length < 3) {
    errors.companyName = "Company name must be at least 3 characters long";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}

export function validateProvider({ email, password, confirmPassword, name }, setErrors) {
  const errors = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

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

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}

// validate update password

export function validateUpdatePassword({ currentPassword, newPassword, confirmNewPassword }, setErrors) {
  const errors = {};

  if (!currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  if (!newPassword) {
    errors.newPassword = "New password is required";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters long";
  }

  if (!confirmNewPassword) {
    errors.confirmNewPassword = "Confirm new password is required";
  } else if (confirmNewPassword !== newPassword) {
    errors.confirmNewPassword = "Passwords do not match";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}

export function validateAddress(data, setErrors) {
  const errors = {};

  if (!data.street) {
    errors.street = "Street is required";
  }
  if (!data.buildingNo) {
    errors.buildingNo = "Building number is required";
  }

  if (!data.zipCode) {
    errors.zipCode = "Zip code is required";
  }

  if (!data.city) {
    errors.city = "City is required";
  }

  if (!data.country) {
    errors.country = "Country is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
