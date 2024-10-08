export function validateCreate({ apartmentId, maintenanceType, maintenanceDetails }, setErrors) {
  const errors = {};

  if (!apartmentId) {
    errors.apartmentId = "Apartment is required";
  }

  if (!maintenanceType) {
    errors.maintenanceType = "Maintenance type is required";
  }

  if (!maintenanceDetails) {
    errors.maintenanceDetails = "Maintenance details are required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
}
