import validator from "validator";

export function validateContact(data, setErrors) {
  const errors = {};

  if (!data.name) {
    errors.name = "Name is required";
  }

  if (!data.email) {
    errors.email = "Email is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.phone) {
    errors.phone = "Phone is required";
  }

  if (!data.message) {
    errors.message = "Message is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
