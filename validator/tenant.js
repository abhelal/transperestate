import validator from "validator";

export function validateInfo({ job, familyMember, permAddress, permCountry, permCity, permZipCode }, setErrors) {
  const errors = {};

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

export function validateHomeDetails({ properties, apartment, leaseStartDate, leaseEndDate, rent, deposit, lateFee }, setErrors) {
  const errors = {};

  if (!properties || properties.length === 0) {
    errors.properties = "Properties are required";
  }

  if (!apartment) {
    errors.apartment = "Apartment is required";
  }

  if (!leaseStartDate) {
    errors.leaseStartDate = "Lease start date is required";
  }

  if (!leaseEndDate) {
    errors.leaseEndDate = "Lease end date is required";
  }

  if (!rent) {
    errors.rent = "Rent is required";
  }

  if (!deposit) {
    errors.deposit = "Deposit is required";
  }

  if (!lateFee) {
    errors.lateFee = "Late fee is required";
  }
  setErrors(errors);
  return Object.keys(errors).length === 0;
}
