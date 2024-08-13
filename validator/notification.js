export function validateNotification({ properties, date, title, body }, setErrors) {
  const errors = {};

  if (!properties.length) {
    errors.properties = "Please select property";
  }

  if (!date) {
    errors.date = "Please select a date";
  }

  if (!title) {
    errors.title = "Title is required";
  }

  if (!body) {
    errors.body = "Notification is required";
  }
  setErrors(errors);
  return Object.keys(errors).length === 0;
}
