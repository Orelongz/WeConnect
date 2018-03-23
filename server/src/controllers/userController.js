import bcrypt from 'bcrypt';
import { genToken } from './../services/jwtService';
import { notFound } from './../services/genericMessages';
import { db } from './../models';

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

    const hashedPassword = bcrypt.hashSync(password, 10);
    return User.create({
      firstname, lastname, email, hashedPassword
    })
      .then((user) => {
        const token = genToken({ id: user.id, email: user.email });
        return res.status(201).json({
          message: 'User successfully created',
          user: {
            firstname, lastname, email
          },
          token
        });
      });
  }

  /**
   * login()
   * @desc Logs in an authenticated user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static login(req, res) {
    const { password } = req.body;
    const user = req.foundUser;

    if (!bcrypt.compareSync(password, user.hashedPassword)) {
      return res.status(401).json({
        message: 'Wrong password'
      });
    }
    const token = genToken({ id: user.id, email: user.email });
    return res.status(202).json({
      message: `Welcome ${user.firstname} ${user.lastname}`,
      token
    });
  }

  /**
   * updateUserDetails()
   * @desc updates the details of a user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static updateUserDetails(req, res) {
    const { id } = req.decoded;

    return User.findOne({
      where: { id }
    })
      .then((user) => {
        const { firstname, lastname, email } = req.body;
        return user.update({ firstname, lastname, email })
          .then(() => res.status(200).json({
            message: 'User details updated',
            user: {
              firstname, lastname, email
            }
          }));
      });
  }

  /**
   * logout()
   * @desc Logs out an authenticated user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static logout(req, res) {
    return res.status(200).json({
      message: 'You have been logged out',
      token: null
    });
  }
}
