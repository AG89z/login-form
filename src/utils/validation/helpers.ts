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

function isError(value: MaybeValidationError): value is ValidationError {
  return (value as ValidationError).error !== undefined;
}

export const makeValidator: ValidatorBuilder = (validateFn, error) => (
  value
) => {
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

export const makeValidationFunction = (validators: Validator[]) => (
  value: string
) => {
  const maybeValid = composeValidators(...validators)(value);

  if (!isError(maybeValid)) {
    return true;
  }

  return maybeValid;
};

export default { makeValidator, makeValidationFunction };
