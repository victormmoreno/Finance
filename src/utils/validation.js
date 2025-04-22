export const isRequired = (value) => {
  if (value === undefined || value === null || value.toString().trim() === '') {
    return false;
  }
  return true;
};

export const minLength = (value, length) => {
  if (!value || value.toString().trim().length < length) {
    return false;
  }
  return true;
};

export const isPositiveNumber = (value) => {
  const number = Number(value);
  if (isNaN(number) || number <= 0) {
    return false;
  }
  return true;
};

export const isNotFutureDate = (value) => {
  if (!value) return false;
  const inputDate = new Date(value);
  const today = new Date();
  // Reset time portion for accurate comparison
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return inputDate <= today;
};
