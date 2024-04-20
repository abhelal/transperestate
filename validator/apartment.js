import validator from "validator";

export function validateCreate({ floor, door, size, rooms }, setErrors) {
  const errors = {};

  if (!floor) {
    errors.floor = "Floor is required";
  }

  if (!door) {
    errors.door = "Door is required";
  } else if (!validator.isAlpha(door)) {
    errors.door = "Door must be alphabet only";
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