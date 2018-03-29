import bcrypt from 'bcrypt';
import { generateToken } from './../services/jwtService';
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
      firstname, lastname, email: email.toLowerCase(), hashedPassword
    })
      .then((user) => {
        const token = generateToken({ id: user.id, email: user.email });
        return res.status(201).json({
          user: {
            firstname, lastname, email
          },
          token
        });
      })
      .catch(error => res.status(500).json({ error }));
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
    const {
      id, firstname, lastname, email, hashedPassword
    } = req.foundUser;

    if (!bcrypt.compareSync(password, hashedPassword)) {
      return res.status(401).json({
        message: 'Wrong password'
      });
    }
    const token = generateToken({ id, email });
    return res.status(200).json({
      user: {
        firstname, lastname
      },
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
            message: 'Update successful',
            user: {
              firstname, lastname, email
            }
          }));
      })
      .catch(error => res.status(500).json({ error }));
  }
}
