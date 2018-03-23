/**
 * notFound()
 * @param {Object} res response object
 * @param {String} str string
 * @return {Object} message
 */
const notFound = (res, str) => res.status(404).json({
  message: `${str} not found`
});

/**
 * unauthorized()
 * @param {Object} res response object
 * @param {String} str string
 * @return {Object} message
 */
const unauthorized = res => res.status(401).json({
  message: 'Unauthorized access to content'
});

// /**
//  * checkUUID()
//  * @param {Object} res express response object
//  * @param {String} id string
//  * @param {String} str string
//  * @return {Object} message
//  */
// const checkUUID = ((res, id, str) => {
//   if (!validator.isUUID(id)) {
//     return notFound(res, str);
//   }
// });

export { notFound, unauthorized };
