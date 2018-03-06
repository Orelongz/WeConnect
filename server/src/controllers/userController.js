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
  const error = [];
  if (!req.body.firstname || req.body.firstname.trim() === '') {
    error.push('The firstname field cannot be empty');
  }
  if (!req.body.lastname || req.body.lastname.trim() === '') {
    error.push('The lastname field cannot be empty');
  }
  if (!req.body.email || req.body.email.trim() === '') {
    error.push('The email field cannot be empty');
  }
  if (!req.body.password || req.body.password.trim() === '') {
    error.push('The password field cannot be empty');
  }
  if (req.body.password !== req.body.confirmPassword) {
    error.push('Password and confirm password fields do not match');
  }
  if (error.length > 0) {
    return res.status(406).json({ error });
  }
  const {
    firstname, lastname, email, password
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    firstname, lastname, email, hashedPassword
  });
  allUsers.push(newUser);

  return res.status(201).json({
    message: 'User successfully created',
    user: newUser
  });
};

export default signup;
