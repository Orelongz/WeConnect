import bcrypt from 'bcrypt';
import db from './../models';

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
    User.create({
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
}

export default userController;
