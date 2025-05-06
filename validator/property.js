// Validate Property

export function validatePropertyCreate({ name, propertyType, street, buildingNo, zipCode, city, country }, setErrors) {
  const errors = {};

  if (!name) {
    errors.name = "Property name is required";
  } else if (name.length < 3) {
    errors.name = "Property name must be at least 3 charecters long";
  }

  if (!propertyType) {
    errors.propertyType = "Property type is required";
  }

  if (!street) {
    errors.street = "Street is required";
  }

  if (!buildingNo) {
    errors.buildingNo = "Building number is required";
  }

  if (!zipCode) {
    errors.zipCode = "Zip code is required";
  }

  if (!city) {
    errors.city = "City is required";
  }

  if (!country) {
    errors.country = "Country is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}

// Validate Property update

export function validateUpdate({ name, propertyType, street, buildingNo, zipCode, city, country }, setErrors) {
  const errors = {};

  if (!name) {
    errors.name = "Property name is required";
  } else if (name.length < 3) {
    errors.name = "Property name must be at least 3 charecters long";
  }

  if (!propertyType) {
    errors.propertyType = "Property type is required";
  }

  if (!street) {
    errors.street = "Street is required";
  }

  if (!buildingNo) {
    errors.buildingNo = "Building number is required";
  }

  if (!zipCode) {
    errors.zipCode = "Zip code is required";
  }

  if (!city) {
    errors.city = "City is required";
  }

  if (!country) {
    errors.country = "Country is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
