export const isValidEmailOrMobile = (value: string): boolean => {
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const indianMobileRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
  return emailRegex.test(trimmed) || indianMobileRegex.test(trimmed);
};

export const validateLoginForm = (identifier: string, password: string) => {
  const errors: { identifier?: string; password?: string } = {};

  if (!identifier.trim()) {
    errors.identifier = 'Email address or mobile number is required';
  } else if (!isValidEmailOrMobile(identifier)) {
    errors.identifier = 'Please enter a valid email address or 10-digit mobile number';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};