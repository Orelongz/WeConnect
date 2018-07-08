import bcrypt from 'bcrypt';
import shortId from 'shortid';
import {
  generateToken,
  handleValidation,
  handleErrorMessage
} from './../helpers';
import {
  confirmationEmail,
  contactUsMails
} from './../helpers/mailMessages';
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
    const verificationToken = shortId.generate();

    return User.create({
      firstname, lastname, email: email.toLowerCase(), hashedPassword, verificationToken
    })
      .then((user) => {
        const { id, isConfirmed } = user;
        const token = generateToken({ id, email });
        confirmationEmail(user);
        return res.status(201).json({
          status: 'success',
          data: {
            user: {
              firstname, lastname, email, id, token, isConfirmed
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
            hashedPassword, firstname, lastname, id, userImage, isConfirmed
          } = user;
          if (user && bcrypt.compareSync(password, hashedPassword)) {
            const token = generateToken({ id, email });
            return res.status(200).json({
              status: 'success',
              data: {
                user: {
                  firstname, lastname, email, id, userImage, token, isConfirmed
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
    const {
      firstname, lastname, email, userImage
    } = req.body;
    const { id } = req.decoded;

    return User.findOne({
      where: { id }
    })
      .then((user) => {
        const { isConfirmed } = user;
        const token = generateToken({ id, email });
        return user
          .update({
            firstname, lastname, email, userImage
          })
          .then(() => res.status(200).json({
            status: 'success',
            data: {
              user: {
                firstname, lastname, email, id, userImage, token, isConfirmed
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
        const {
          firstname, lastname, email, userImage, isConfirmed
        } = user;
        return res.status(200).json({
          status: 'success',
          data: {
            user: {
              firstname, lastname, email, userImage, id, isConfirmed
            }
          }
        });
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * verifyAccount()
   * @desc gets the details of a user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static verifyAccount(req, res) {
    const { verificationToken } = req.body;

    return User.findOne({
      where: { verificationToken }
    })
      .then((user) => {
        const {
          firstname, lastname, email, id, userImage
        } = user;
        if (!user.isConfirmed) {
          const token = generateToken({ id, email });
          return user.update({ isConfirmed: true })
            .then(() => res.status(200).json({
              status: 'success',
              user: {
                isConfirmed: true, firstname, lastname, email, id, userImage, token
              }
            }));
        }
        return res.status(200).json({
          status: 'success',
          message: 'Account already verified'
        });
      })
      .catch(() => res.status(200).json({
        status: 'fail',
        error: 'Verification not successful'
      }));
  }

  /**
   * contactUs()
   * @desc gets the details of a user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} mails
   */
  static contactUs(req, res) {
    const { name, email, message } = req.body;

    const validationFailed = handleValidation(res, {
      name, email, message
    });
    if (validationFailed) return validationFailed;

    contactUsMails({ email, name, message });
    res.status(200).json({
      status: 'success',
      message: 'Message delivered'
    });
  }
}
