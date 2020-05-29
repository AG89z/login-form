import { makeValidator, makeValidationFunction } from './helpers';

const isNonEmpty = makeValidator((email) => email.length > 0, {
  error: 'EMPTY_FIELD',
  message: 'The email field cannot be empty',
});

// eslint-disable-next-line no-control-regex
const isASCII = makeValidator((email) => /^[\x00-\x7F]*$/.test(email), {
  error: 'NON_ASCII',
  message: 'Only US ASCII characters allowed',
});

const isNotTooLong = makeValidator((email) => email.length <= 256, {
  error: 'TOO_LONG',
  message: 'The email should have less than 256 characters',
});

const followsBasicPattern = makeValidator(
  (email) => /^([^\s@.]+\.)*[^\s@.]+@([^\s@.]+\.)*[^\s@.]+\s*$/.test(email),
  {
    error: 'IRREGULAR_PATTERN',
    message: 'Are you sure you typed a correct email address?',
  }
);

const accountIsNotTooLong = makeValidator(
  (email) => {
    const [account] = email.split('@');
    return account.length <= 64;
  },
  {
    error: 'ACCOUNT_TOO_LONG',
    message: 'The part before @ should have less than 64 characters',
  }
);

const domainPartIsCorrect = makeValidator(
  (email) => {
    const domain = email.split('@')[1];
    return domain.split('.').every((part) => part.length <= 64);
  },
  {
    error: 'INVALID_DOMAIN',
    message:
      'The domain parts within dots (.) should have less than 64 characters',
  }
);

// From http://emailregex.com/
const adheresToSuperRegex = makeValidator(
  (email) =>
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email
    ),
  {
    error: 'INVALID_EMAIL',
    message: 'Invalid email',
  }
);

/**
 * Returns true if the email is valid,
 * otherwise returns the first found validation error
 */
export const validateEmail = makeValidationFunction([
  isNonEmpty,
  isASCII,
  isNotTooLong,
  followsBasicPattern,
  accountIsNotTooLong,
  domainPartIsCorrect,
  adheresToSuperRegex,
]);

export default validateEmail;
