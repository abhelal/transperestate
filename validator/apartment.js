import validator from "validator";

export function validateCreate({ floor, door, size, rooms }, setErrors) {
  const errors = {};

  if (!floor) {
    errors.floor = "Floor is required";
  } else if (!validator.isAlphanumeric(floor)) {
    errors.floor = "Floor must be alphanumeric";
  }

  if (!door) {
    errors.door = "Door is required";
  } else if (!validator.isAlphanumeric(door)) {
    errors.door = "Door must be alphanumeric";
  }

  if (!size) {
    errors.size = "Size is required";
  } else if (size < 1) {
    errors.size = "Size must be at least 1";
  }

  if (!rooms) {
    errors.rooms = "Rooms are required";
  } else if (rooms < 1) {
    errors.rooms = "Rooms must be at least 1";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}

export function validateUpdateApartment({ size, rooms }, setErrors) {
  const errors = {};

  if (!size) {
    errors.size = "Size is required";
  } else if (size < 1) {
    errors.size = "Size must be at least 1";
  }

  if (!rooms) {
    errors.rooms = "Rooms are required";
  } else if (rooms < 1) {
    errors.rooms = "Rooms must be at least 1";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
