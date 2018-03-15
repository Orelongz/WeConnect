import validator from 'validator';

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
   * @return {*} error, void
   */
  static signUpValidation(req, res, next) {
    const error = [];
    const {
      firstname, lastname, email, password, confirmPassword
    } = req.body;
    if (!firstname || firstname.trim() === '') {
      error.push('The firstname field cannot be empty');
    }
    if (!lastname || lastname.trim() === '') {
      error.push('The lastname field cannot be empty');
    }
    if (!email || email.trim() === '') {
      error.push('The email field cannot be empty');
    }
    if (!password || password.trim() === '') {
      error.push('The password field cannot be empty');
    }
    if (password !== confirmPassword) {
      error.push('Password and confirm password fields do not match');
    }
    if (error.length > 0) {
      return res.status(406).json({ error });
    }
    return next();
  }

  /**
   * validateEmail()
   * @desc handles email validation
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} error, void
   */
  static validateEmail(req, res, next) {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address'
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
   * @return {*} error, void
   */
  static signInValidation(req, res, next) {
    const error = [];
    const { email, password } = req.body;
    if (!email || email.trim() === '') {
      error.push('The email field cannot be empty');
    }
    if (!password || password.trim() === '') {
      error.push('The password field cannot be empty');
    }
    if (error.length > 0) {
      return res.status(406).json({ error });
    }
    return next();
  }
}
