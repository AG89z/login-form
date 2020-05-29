import { makeValidator, makeValidationFunction } from './helpers';

const isNonEmpty = makeValidator((email) => email.length > 0, {
  error: 'EMPTY_FIELD',
  message: 'The password field cannot be empty',
});

const notTooShort = makeValidator((email) => email.length >= 5, {
  error: 'PASSWORD_TOO_SHORT',
  message: 'The password should have at least 5 characters',
});

/**
 * Returns true if the password is valid,
 * otherwise returns the first found validation error
 */
export const validatePassword = makeValidationFunction([
  isNonEmpty,
  notTooShort,
]);

export default validatePassword;
