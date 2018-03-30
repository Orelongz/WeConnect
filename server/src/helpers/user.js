import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { unauthorized } from './genericMessages';

dotenv.config();

const { SECRET } = process.env;

/**
* generateToken
* @desc generates authentication token
* @param {Object} payload object
* @returns {String} token
*/
const generateToken = payload => jwt.sign(payload, SECRET, { expiresIn: '24h' });

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
    if (!value) {
      error.push(`${key} must not be empty`)
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
  console.log(error);
  if (error.errors) {
    return res.status(400).json({
      status: 'fail',
      error: error.errors.map(eachError => eachError.message)
    });
  }
  return unauthorized(res);
};

export {
  generateToken,
  handleValidation,
  handleErrorMessage
};
