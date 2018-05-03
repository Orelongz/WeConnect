import db from './../models';
import {
  notFound,
  checkUUID,
  unauthorized,
  handleValidation,
  handleErrorMessage
} from '../helpers/';

const { Business, Review, User } = db;

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
    const { id: userId } = req.decoded;

    const validationFailed = handleValidation(res, { review });
    if (validationFailed) return validationFailed;

    const isNotUUID = checkUUID(res, businessId, 'Business');
    if (isNotUUID) return isNotUUID;

    return Business.findOne({ where: { id: businessId } })
      .then((business) => {
        if (!business) return notFound(res, 'Business');

        return Review.create({ review, businessId, userId })
          .then(theReview => res.status(201).json({
            status: 'success',
            data: { review: theReview }
          }));
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * getBusinessReviews() getUserReview
   * @desc retrieves all reviews for a business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, reviews
   */
  static getBusinessReviews(req, res) {
    const { businessId } = req.params;

    const isNotUUID = checkUUID(res, businessId, 'Business');
    if (isNotUUID) return isNotUUID;

    return Business.findOne({ where: { id: businessId } })
      .then((business) => {
        if (!business) return notFound(res, 'Business');
        Review.all({
          where: { businessId },
          include: [{
            model: User,
            attributes: ['firstname', 'lastname']
          }]
        })
          .then(reviews => res.status(200).json({
            status: 'success',
            data: { reviews }
          }));
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * getUserReview
   * @desc retrives a review for a business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, review
   */
  static getReview(req, res) {
    const { reviewId: id } = req.params;
    const { id: userId } = req.decoded;

    const isNotUUID = checkUUID(res, id, 'Review');
    if (isNotUUID) return isNotUUID;

    return Review.findOne({
      where: { id, userId }
    })
      .then((review) => {
        if (!review) return unauthorized(res);
        return res.status(200).json({
          status: 'success',
          data: { review }
        });
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * editReview
   * @desc edits a review for a business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, review
   */
  static editReview(req, res) {
    const { reviewId: id } = req.params;
    const { id: userId } = req.decoded;
    const { review } = req.body;

    const validationFailed = handleValidation(res, { review });
    if (validationFailed) return validationFailed;

    const isNotUUID = checkUUID(res, id, 'Review');
    if (isNotUUID) return isNotUUID;

    return Review.update(
      { review },
      { where: { id, userId }, returning: true, plain: true }
    )
      .then(theReview => res.status(200).json({
        status: 'success',
        data: { review: theReview[1] }
      }))
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * deleteReview
   * @desc deletes a review for a business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, review
   */
  static deleteReview(req, res) {
    const { reviewId: id } = req.params;
    const { id: userId } = req.decoded;

    const isNotUUID = checkUUID(res, id, 'Review');
    if (isNotUUID) return isNotUUID;

    return Review.destroy({ where: { id, userId } })
      .then((result) => {
        if (result === 1) {
          return res.status(200).json({
            status: 'success',
            message: 'Review deleted'
          });
        }
        return unauthorized(res);
      })
      .catch(error => handleErrorMessage(res, error));
  }
}
