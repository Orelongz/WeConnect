import { db } from './../models';

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
    const { businessId } = req.params;
    const { review } = req.body;

    return Review.create({ review, businessId })
      .then(thereview => res.status(201).json({
        message: 'Review was successfully added',
        review: thereview
      }));
  }

  /**
   * getBusinessReview()
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
}
