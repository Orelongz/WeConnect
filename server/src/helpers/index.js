import validator from 'validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

/**
 * notFound()
 * @param {Object} res response object
 * @param {String} str string
 * @return {Object} message
 */
const notFound = (res, str) => res.status(404).json({
  status: 'fail',
  error: `${str} not found`
});

/**
 * unauthorized()
 * @param {Object} res response object
 * @param {String} str string
 * @return {Object} message
 */
const unauthorized = res => res.status(403).json({
  status: 'fail',
  error: 'Access to content denied'
});

/**
 * handleValidation()
 * @desc handles validation of all input fields
 * @param {Object} res response object
 * @param {Object} inputObject inputs to be validated
 * @return {*} message, void
 */
const handleValidation = (res, inputObject) => {
  const error = [];
  Object.entries(inputObject).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      error.push(`${key} must not be empty`);
    }
  });
  if (error.length > 0) {
    return res.status(400).json({
      status: 'fail',
      error
    });
  }
};

/**
 * handleErrorMessage()
 * @desc handles validation of signup input fields
 * @param {Object} res response object
 * @param {Object} error passed in error object
 * @return {*} message, void
 */
const handleErrorMessage = (res, error) => {
  if (error.errors) {
    return res.status(400).json({
      status: 'fail',
      error: error.errors.map(eachError => eachError.message)
    });
  }
  if (Object.keys(error).length === 0) {
    return unauthorized(res);
  }
};

/**
 * checkUUID()
 * @desc finds a business by its Id
 * @param {Object} res response object
 * @param {Object} id incoming id
 * @param {Object} str name of model
 * @return {Object} json object
 */
const checkUUID = (res, id, str) => {
  if (!validator.isUUID(id)) {
    return notFound(res, str);
  }
};

/**
* generateToken()
* @desc generates authentication token
* @param {Object} payload object
* @returns {String} token
*/
const generateToken = payload => jwt.sign(payload, SECRET, { expiresIn: '24h' });

export {
  notFound,
  checkUUID,
  unauthorized,
  generateToken,
  handleValidation,
  handleErrorMessage
};
