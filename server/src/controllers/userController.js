import bcrypt from 'bcrypt';
import {
  notFound,
  generateToken,
  handleValidation,
  handleErrorMessage
} from './../helpers';
import db from './../models';

const { User } = db;

/**
* @class userController
* @desc handles the user route
*/
export default class UserController {
  /**
   * signup()
   * @desc Registers a new user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static signup(req, res) {
    const {
      firstname, lastname, email, password
    } = req.body;

    const validationFailed = handleValidation(res, {
      firstname, lastname, email, password
    });
    if (validationFailed) return validationFailed;

    const hashedPassword = bcrypt.hashSync(password, 10);

    return User.create({
      firstname, lastname, email: email.toLowerCase(), hashedPassword
    })
      .then((user) => {
        const { id } = user;
        const token = generateToken({ id, email });
        return res.status(201).json({
          status: 'success',
          data: {
            user: {
              firstname, lastname, email, id, token
            }
          }
        });
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * login()
   * @desc Logs in an authenticated user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static login(req, res) {
    const { email, password } = req.body;

    const validationFailed = handleValidation(res, { email, password });
    if (validationFailed) return validationFailed;

    return User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (user) {
          const {
            hashedPassword, firstname, lastname, id
          } = user;
          if (user && bcrypt.compareSync(password, hashedPassword)) {
            const token = generateToken({ id, email });
            return res.status(200).json({
              status: 'success',
              data: {
                user: {
                  firstname, lastname, email, id, token
                }
              }
            });
          }
        }
        return res.status(401).json({
          status: 'fail',
          error: 'Wrong email or password'
        });
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * updateUserDetails()
   * @desc updates the details of a user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static updateUserDetails(req, res) {
    const { firstname, lastname, email } = req.body;

    const validationFailed = handleValidation(res, { firstname, lastname, email });
    if (validationFailed) return validationFailed;

    const { id } = req.decoded;

    return User.findOne({
      where: {
        id
      }
    })
      .then((user) => {
        if (!user) {
          return notFound(res, 'User');
        }
        const token = generateToken({ id, email });
        return user
          .update({ firstname, lastname, email })
          .then(() => res.status(200).json({
            status: 'success',
            data: {
              user: {
                firstname, lastname, email, id, token
              }
            }
          }));
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * getUserDetails()
   * @desc gets the details of a user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static getUserDetails(req, res) {
    const { id } = req.decoded;

    return User.findOne({
      where: {
        id
      }
    })
      .then((user) => {
        const { firstname, lastname, email } = user;
        return res.status(200).json({
          status: 'success',
          data: {
            user: {
              firstname, lastname, email, id
            }
          }
        });
      })
      .catch(error => handleErrorMessage(res, error));
  }
}
