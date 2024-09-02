export function validateSubscriptionPlan({ name, price, duration, description, features }, setErrors) {
  const errors = {};

  if (!name) {
    errors.name = "Name is required";
  }

  if (!price) {
    errors.price = "Price is required";
  }

  if (!duration) {
    errors.duration = "Duration is required";
  }

  if (!description) {
    errors.description = "Description is required";
  }
  if (features.length === 0) {
    errors.features = "Features are required";
  }

  if (features.includes("")) {
    errors.features = "Feature cannot be empty";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
