import bcrypt from 'bcrypt';
import { db } from './../models';

const { User } = db;

/**
* @class userController
* @desc handles the user route
*/
class userController {
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
      .then(user => res.status(201).json({
        message: 'User successfully created',
        user
      }))
      .catch(err => res.status(409).json({
        message: err.errors[0].message
      }));
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
    return User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'Email not found'
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({
            message: 'Wrong password'
          });
        }
        return res.status(202).json({
          message: `Welcome ${user.firstname} ${user.lastname}`
        });
      })
      .catch(err => res.status(500).json({ err }));
  }
}

export default userController;
