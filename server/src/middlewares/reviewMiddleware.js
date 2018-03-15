import { db } from './../models';

const { Business } = db;

/**
 * @class ReviewMiddleware
 * @desc middleware for reviews
 */
export default class ReviewMiddleware {
  /**
   * validateReview()
   * @desc handles validation of review input field
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} void
   */
  static validateReview(req, res, next) {
    const { review } = req.body;
    if (!review || review.trim() === '') {
      return res.status(406).json({
        message: 'The review input field cannot be empty'
      });
    }
    return next();
  }

  /**
   * businessExists()
   * @desc checks if a businessId exists in db
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} void
   */
  static businessExists(req, res, next) {
    const { businessId } = req.params;

    return Business.findOne({
      where: {
        businessId
      }
    })
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'Business was not found'
          });
        }
        return next();
      });
  }
}
