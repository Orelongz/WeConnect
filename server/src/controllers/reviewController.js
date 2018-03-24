import validator from 'validator';
import { db } from './../models';
import { notFound } from './../services/genericMessages';

const { Review } = db;

/**
 * @class reviewController
 * @desc handles reviews route
 */
export default class ReviewController {
  /**
   * addReview()
   * @desc adds a review to a business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business(containing the review)
   */
  static addReview(req, res) {
    const userId = req.decoded.id;
    const { businessId } = req.params;
    const { review } = req.body;

    return Review.create({ review, businessId, userId })
      .then(theReview => res.status(201).json({
        message: 'Review was successfully added',
        review: theReview
      }));
  }

  /**
   * getBusinessReviews() getUserReview
   * @desc adds a review to a business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, reviews
   */
  static getBusinessReviews(req, res) {
    const { businessId } = req.params;

    return Review.all({
      where: {
        businessId
      }
    })
      .then(reviews => res.status(200).json({
        message: 'Reviews found',
        reviews
      }));
  }

  /**
   * getUserReview
   * @desc adds a review to a business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, reviews
   */
  static getReview(req, res) {
    const { businessId, reviewId } = req.params;

    if (!validator.isUUID(reviewId)) {
      return notFound(res, 'Review');
    }

    const userId = req.decoded.id;

    return Review.findOne({
      where: {
        id: reviewId,
        businessId,
        userId
      }
    })
      .then((review) => {
        if (review) {
          return res.status(200).json({
            message: 'Review found',
            review
          });
        }
        return notFound(res, 'Review');
      });
  }
}
