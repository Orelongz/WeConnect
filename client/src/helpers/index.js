import validator from 'validator';
import humanizeString from 'humanize-string';

/**
 * validate()
 * @desc handles validation of all input fields
 * @param {Object} inputObject inputs to be validated
 * @return {Object} errors
 */
function validate(inputObject) {
  const errors = {};
  Object.entries(inputObject).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      errors[key] = (`${humanizeString(key)} must not be empty`);
    }
    if (key === 'email' && !validator.isEmail(value)) {
      errors[key] = 'Email is not valid';
    }
  });
  return errors;
}

/**
 * handleErrorCatch()
 * @desc handles the error passed from the server
 * @param {error} error
 * @return {String} error
 */
function handleErrorCatch(error) {
  // errror is either a strings or an array
  if (typeof error.error === 'string') {
    return error.error;
  }
  return error.error[0];
}

export {
  validate,
  handleErrorCatch
};
