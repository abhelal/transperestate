import validator from "validator";

export function validateCreate({ email, password, name, contactNumber }, setErrors) {
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
    errors.name = "Tenant name is required";
  } else if (name.length < 3) {
    errors.name = "Tenant name must be at least 3 charecters long";
  }

  if (!contactNumber) {
    errors.contactNumber = "Contact number is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}

export function validateInfo(
  {
    email,
    name,
    contactNumber,
    job,
    familyMember,
    permAddress,
    permCountry,
    permState,
    permCity,
    permZipCode,
  },

  setErrors
) {
  const errors = {};

  if (!email) {
    errors.email = "Email address is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }
  if (!name) {
    errors.name = "Tenant name is required";
  } else if (name.length < 3) {
    errors.name = "Tenant name must be at least 3 charecters long";
  }

  if (!contactNumber) {
    errors.contactNumber = "Contact number is required";
  }

  if (!job) {
    errors.job = "Job is required";
  }

  if (!familyMember) {
    errors.familyMember = "Family member is required";
  }

  if (!permAddress) {
    errors.permAddress = "Permanent address is required";
  }

  if (!permCountry) {
    errors.permCountry = "Country is required";
  }

  if (!permCity) {
    errors.permCity = "City is required";
  }

  if (!permZipCode) {
    errors.permZipCode = "Zip code is required";
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
