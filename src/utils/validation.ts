export interface ValidationError {
  error: string;
  message: string;
}

function nonEmpty(email: string) {
  if (email.length > 0) {
    return true;
  }
  return false;
}

export function validateEmail(email: string): true | ValidationError {
  if (!nonEmpty(email)) {
    return {
      error: 'EMPTY_EMAIL_STRING',
      message: 'The email field cannot be empty',
    };
  }

  return true;
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
