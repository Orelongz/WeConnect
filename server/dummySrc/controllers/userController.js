import bcrypt from 'bcrypt';
import User from './../models/userModel';

const allUsers = [];

/**
 * signup()
 * @desc Registers a new user
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, user
 */
const signup = (req, res) => {
  const {
    firstname, lastname, email, password
  } = req.body;

  let user = allUsers.find(eachUser => eachUser.email === email);
  if (user) {
    return res.status(409).json({
      message: 'This email already has an account'
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  user = new User({
    firstname, lastname, email, hashedPassword
  });
  allUsers.push(user);

  return res.status(201).json({
    message: 'User successfully created',
    user
  });
};

/**
 * login()
 * @desc Logs in an authenticated user
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, user
 */
const login = (req, res) => {
  const { email, password } = req.body;
  const user = allUsers.find(eachUser => eachUser.email === email);
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
};

export { signup, login, allUsers };
