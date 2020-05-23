export function validateEmail(email: string) {
  const errors = [];
  if (!email.match(/.+@.+\..+/)) {
    errors.push('Bad email pattern');
  }
  return errors;
}

export function validatePassword(password: string) {
  const errors = [];
  if (password.length < 5) {
    errors.push('The password is too short');
  }
  return errors;
}

export default { validateEmail, validatePassword };
