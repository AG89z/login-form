// INTERFACES

interface ValidationError {
  error: string;
  message: string;
}

type MaybeValidationError = string | ValidationError;

interface Validator {
  (value: MaybeValidationError): MaybeValidationError;
}

interface ValidatorBuilder {
  (validate: (value: string) => boolean, error: ValidationError): Validator;
}

// HELPERS

function isError(value: MaybeValidationError): value is ValidationError {
  return (value as ValidationError).error !== undefined;
}

const makeValidator: ValidatorBuilder = (validateFn, error) => (value) => {
  if (isError(value)) {
    return value;
  }

  if (validateFn(value)) {
    return value;
  }

  return error;
};

const composeValidators = (...validators: Validator[]) => (
  value: MaybeValidationError
) => validators.reduce((res, validate) => validate(res), value);

const makeValidate = (validators: Validator[]) => (value: string) => {
  const maybeValid = composeValidators(...validators)(value);

  if (!isError(maybeValid)) {
    return true;
  }

  return maybeValid;
};

// EMAIL VALIDATORS

const nonEmpty = makeValidator(
  (email) => {
    if (email.length > 0) {
      return true;
    }
    return false;
  },
  {
    error: 'EMPTY_FIELD',
    message: 'The field cannot be empty',
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

// PASSWORD VALIDATORS

const notTooShort = makeValidator(
  (email) => {
    if (email.length > 5) {
      return true;
    }
    return false;
  },
  {
    error: 'PASSWORD_TOO_SHORT',
    message: 'The password you provided is too short',
  }
);

// EXPORTS

export const validateEmail = makeValidate([nonEmpty, notTooLong]);

export const validatePassword = makeValidate([nonEmpty, notTooShort]);

export default { validateEmail, validatePassword };
