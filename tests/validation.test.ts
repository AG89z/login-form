import { validateEmail, validatePassword } from '../src/utils/validation';

describe('Test email validation', () => {
  test('Empty field', () => {
    expect(validateEmail('') === true).toBe(false);
  });

  test('Non ASCII characters', () => {
    expect(validateEmail('ł') === true).toBe(false);
  });

  test('Too long text', () => {
    expect(
      validateEmail(
        'alooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeemail'
      ) === true
    ).toBe(false);
  });

  test('Wrong patter', () => {
    expect(validateEmail('wrong@@pattern.com') === true).toBe(false);
  });

  test('Too long account', () => {
    expect(
      validateEmail(
        'alooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong@account.com'
      ) === true
    ).toBe(false);
  });

  test('Too long domain', () => {
    expect(
      validateEmail(
        'along@accoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooount.com'
      ) === true
    ).toBe(false);
  });

  test('Invalid email', () => {
    expect(validateEmail('invalid@adfasd\\\\.com') === true).toBe(false);
  });
});

describe('Test password validation', () => {
  test('Empty field', () => {
    expect(validatePassword('') === true).toBe(false);
  });

  test('Not too short', () => {
    expect(validatePassword('123') === true).toBe(false);
  });
});
