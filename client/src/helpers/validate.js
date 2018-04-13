import validator from 'validator';
import humanizeString from 'humanize-string';

/**
 * validate()
 * @desc handles validation of all input fields
 * @param {Object} inputObject inputs to be validated
 * @return {Object} errors
 */
const validate = (inputObject) => {
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
};

export default validate;
