import validator from 'validator';
import { notFound } from './../services/genericMessages';
import { db } from './../models';

const { Review } = db;
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
   * findReview()
   * @desc handles validation of review input field
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} void, message
   */
  static findReview(req, res, next) {
    const { businessId, reviewId } = req.params;

    if (!validator.isUUID(reviewId)) {
      return notFound(res, 'Review');
    }

    const userId = req.decoded.id;

    Review.findOne({
      where: {
        id: reviewId,
        businessId,
        userId
      }
    })
      .then((review) => {
        if (review) {
          req.foundReview = review;
          return next();
        }
        return notFound(res, 'Review');
      });
  }
}
