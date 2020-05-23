export interface ValidationError {
  error: string;
  message: string;
}

interface Validator {
  (value: string | ValidationError): string | ValidationError;
}

function isError(value: string | ValidationError): value is ValidationError {
  return (value as ValidationError).error !== undefined;
}

const makeValidator = (
  validateFn: (email: string) => boolean,
  error: ValidationError
): Validator => (value) => {
  if (isError(value)) {
    return value;
  }

  if (validateFn(value)) {
    return value;
  }

  return error;
};

const nonEmpty = makeValidator(
  (email) => {
    if (email.length > 0) {
      return true;
    }
    return false;
  },
  {
    error: 'EMPTY_EMAIL_STRING',
    message: 'The email field cannot be empty',
  }
);

const notTooLong = makeValidator(
  (email) => {
    if (email.length < 10) {
      return true;
    }
    return false;
  },
  {
    error: 'EMAIL_TOO_LONG',
    message: 'The email is too long',
  }
);

const composeValidators = (...validators: Validator[]) => (
  value: string | ValidationError
) => validators.reduce((res, validate) => validate(res), value);

export function validateEmail(email: string): true | ValidationError {
  const validEmail = composeValidators(nonEmpty, notTooLong)(email);

  if (!isError(validEmail)) {
    return true;
  }

  return validEmail;
}

export function validatePassword(password: string): true | ValidationError {
  if (password.length < 5) {
    return {
      error: 'PASSWORD_TOO_SHORT',
      message: 'The password you provided is too short',
    };
  }
  return true;
}

export default { validateEmail, validatePassword };
