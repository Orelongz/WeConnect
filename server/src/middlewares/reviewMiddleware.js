import validator from 'validator';
import { db } from './../models';
import { notFound } from './../services/genericMessages';

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

    if (!validator.isUUID(businessId)) {
      return notFound(res, 'Business');
    }

    return Business.findOne({
      where: {
        id: businessId
      }
    })
      .then((business) => {
        if (!business) {
          return notFound(res, 'Business');
        }
        return next();
      });
  }
}
