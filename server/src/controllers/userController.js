import bcrypt from 'bcrypt';
import validator from 'validator';
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

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: 'Please enter a valid email address'
    });
  }
  const existingEmail = allUsers.find(user => user.email === email);
  if (existingEmail) {
    return res.status(409).json({
      message: 'This email already has an account'
    });
  }

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

/**
 * login()
 * @desc Logs in an authenticated user
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, user
 */
const login = (req, res) => {
  const error = [];
  if (!req.body.email || req.body.email.trim() === '') {
    error.push('The email field cannot be empty');
  }
  if (!req.body.password || req.body.password.trim() === '') {
    error.push('The password field cannot be empty');
  }
  if (error.length > 0) {
    return res.status(406).json({ error });
  }
  const { email, password } = req.body;
  const newUser = allUsers.find(user => user.email === email);
  if (!newUser) {
    return res.status(404).json({
      message: 'Email not found'
    });
  }
  if (!bcrypt.compareSync(password, newUser.password)) {
    return res.status(401).json({
      message: 'Password does not match the email provided'
    });
  }
  return res.status(202).json({
    message: `Welcome ${newUser.firstname} ${newUser.lastname}`
  });
};

export { signup, login };
