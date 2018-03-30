/**
 * notFound()
 * @param {Object} res response object
 * @param {String} str string
 * @return {Object} message
 */
const notFound = (res, str) => res.status(404).json({
  status: 'fail',
  error: `${str} not found`
});

/**
 * unauthorized()
 * @param {Object} res response object
 * @param {String} str string
 * @return {Object} message
 */
const unauthorized = res => res.status(403).json({
  status: 'fail',
  error: 'Access to content denied'
});

export { notFound, unauthorized };
