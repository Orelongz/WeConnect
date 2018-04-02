import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

/**
 * validateToken()
 * @desc checks if a user token is valid
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next Express next middleware function
 * @return {*} error, message
 */
const validateToken = (req, res, next) => {
  const token = (
    req.headers.authorization ||
    req.headers['x-access-token']
  );
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      error: 'Token absent'
    });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'fail',
        error: 'Invalid token',
      });
    }
    req.decoded = decoded;
    return next();
  });
};

export default validateToken;
