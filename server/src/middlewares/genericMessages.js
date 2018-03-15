
/**
 * @class errorMessages
 * @desc sends back generic error messages
 */
export default class GenericMessages {
  /**
   * notFound()
   * @param {Object} res response object
   * @param {String} str string
   * @return {Object} message
   */
  static notFound(res, str) {
    return res.status(404).json({
      message: `${str} not found`
    });
  }

  /**
   * notFound()
   * @param {Object} res response object
   * @param {String} str string
   * @return {Object} message
   */
  static unauthorized(res) {
    return res.status(401).json({
      message: 'Unauthorized access to content'
    });
  }
}
