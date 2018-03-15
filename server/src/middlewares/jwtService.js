import jwt from 'jsonwebtoken';

require('dotenv').config();

const { SECRET } = process.env;

/**
* issueToken
* @desc generates auth token
* @param {Object} payload object
* @returns {String} token
*/
const genToken = payload => jwt.sign(payload, SECRET, { expiresIn: '24h' });

/**
 * validateToken()
 * @desc checks if a user token is valid
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next Express next middleware function
 * @return {*} error, void
 */
const validateToken = (req, res, next) => {
  const token = (
    req.query.token ||
    req.headers.authorization ||
    req.headers['x-access-token']
  );
  if (!token) {
    return res.status(401).json({
      message: 'Please login'
    });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        err: 'Invalid token',
      });
    }
    req.decoded = decoded;
    return next();
  });
};

export { genToken, validateToken };
