import jwt from 'jsonwebtoken';
import db from './../models';
import { notFound } from './../services/genericMessages';
require('dotenv').config();

const { SECRET } = process.env;
const { User } = db;

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
 * @param {Object} error passed in error object
 * @return {*} message, void
 */
const handleErrorMessage = (error) => {
  const errorObject = error.errors;
  if (errorObject) {
    return errorObject.map(eachError => eachError.message);
  }
};

export {
  generateToken,
  handleValidation,
  handleErrorMessage
};
