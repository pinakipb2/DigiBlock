import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';
import isEthereumAddress from 'validator/lib/isEthereumAddress';

export function isValidEmail(message) {
  return this.test('isValidEmail', message, function (value) {
    const { path, createError } = this;
    if (!isEmail(value)) {
      return createError({
        path,
        message: 'Invalid email format',
      });
    }
    return true;
  });
}

export function isValidEthereumAddress(message) {
  return this.test('isValidEthereumAddress', message, function (value) {
    const { path, createError } = this;
    if (!isEthereumAddress(value)) {
      return createError({
        path,
        message: 'Invalid Wallet Address',
      });
    }
    return true;
  });
}

export function isValidAlphanumeric(message) {
  return this.test('isValidAlphanumeric', message, function (value) {
    const { path, createError } = this;
    if (!isAlphanumeric(value)) {
      return createError({
        path,
        message: 'Invalid Master Key',
      });
    }
    return true;
  });
}
