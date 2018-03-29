import validator from 'validator';
import { db } from './../models';
import { notFound } from './../services/genericMessages';

const { User } = db;

/**
 * @class UserMiddleware
 * @desc Middleware for user route
 */
export default class UserMiddleware {
  /**
   * signUpValidation()
   * @desc handles validation of signup input fields
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} message, void
   */
  static signUpValidation(req, res, next) {
    const message = [];
    const {
      firstname, lastname, email, password
    } = req.body;
    if (!firstname || firstname.trim() === '' || typeof firstname !== 'string') {
      message.push('The firstname field cannot be empty and must be a string');
    }
    if (!lastname || lastname.trim() === '' || typeof lastname !== 'string') {
      message.push('The lastname field cannot be empty and must be a string');
    }
    if (!email || email.trim() === '' || typeof email !== 'string') {
      message.push('The email field cannot be empty and must be a string');
    }
    if (!password || password.trim() === '' || typeof password !== 'string') {
      message.push('The password field cannot be empty and must be a string');
    }
    if (message.length > 0) {
      return res.status(400).json({ message });
    }
    return next();
  }

  /**
   * validateEmail()
   * @desc handles email validation
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} message, void
   */
  static validateEmail(req, res, next) {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email'
      });
    }
    return next();
  }

  /**
   * signInValidation()
   * @desc handles validation of signin input fields
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} message, void
   */
  static signInValidation(req, res, next) {
    const message = [];
    const { email, password } = req.body;
    if (!email || email.trim() === '' || typeof email !== 'string') {
      message.push('The email field cannot be empty and must be a string');
    }
    if (!password || password.trim() === '' || typeof password !== 'string') {
      message.push('The password field cannot be empty and must be a string');
    }
    if (message.length > 0) {
      return res.status(400).json({ message });
    }
    return next();
  }

  /**
   * updateUserValidation()
   * @desc handles validation of user update input
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} message, void
   */
  static updateUserValidation(req, res, next) {
    const message = [];
    const { firstname, lastname, email } = req.body;
    if (!firstname || firstname.trim() === '' || typeof firstname !== 'string') {
      message.push('The firstname field cannot be empty and must be a string');
    }
    if (!lastname || lastname.trim() === '' || typeof lastname !== 'string') {
      message.push('The lastname field cannot be empty and must be a string');
    }
    if (!email || email.trim() === '' || typeof email !== 'string') {
      message.push('The email field cannot be empty and must be a string');
    }
    if (message.length > 0) {
      return res.status(400).json({ message });
    }
    return next();
  }

  /**
   * mailExists()
   * @desc handles cases of duplicate mail addresses
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} error, void
   */
  static mailExists(req, res, next) {
    const { email } = req.body;

    User.findOne({
      where: {
        email: email.toLowerCase()
      }
    })
      .then((user) => {
        if (req.decoded && req.decoded.email === email) return next();
        if (user) {
          return res.status(409).json({
            message: 'User exist'
          });
        }
        return next();
      })
      .catch(error => res.status(500).json({ error }));
  }

  /**
   * findUserByEmail()
   * @desc finds user by email
   * @param {Object} req request object
   * @param {Array} res allBusinesses array
   * @param {Object} next Express next middleware function
   * @return {Object} message
   */
  static findUserByEmail(req, res, next) {
    const { email } = req.body;

    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          return notFound(res, 'User');
        }
        req.foundUser = user;
        return next();
      })
      .catch(error => res.status(500).json({ error }));
  }
}
