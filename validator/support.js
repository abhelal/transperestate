export function validateTicket({ title, description }, setErrors) {
  const errors = {};

  if (!title) {
    errors.title = "Title is required";
  }
  if (title && title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (!description) {
    errors.description = "Description is required";
  }
  if (description && description.length < 20) {
    errors.description = "Description must be at least 20 characters";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
