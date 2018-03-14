import { db } from './../models';

const { Review, Business } = db;

/**
 * @class reviewController
 * @desc handles reviews route
 */
export default class reviewController {
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
}

// /**
//  * getBusinessReview()
//  * @desc adds a review to a business
//  * @param {Object} req request object
//  * @param {Object} res response object
//  * @return {Object} message, reviews
//  */
// const getBusinessReview = (req, res) => {
//   const { businessId } = req.params;
//   const theBusiness = allBusinesses.find(business => business.businessId === Number(businessId));

//   if (!theBusiness) {
//     return res.status(404).json({
//       message: 'Business was not found'
//     });
//   }

//   const reviews = allReviews.filter(eachReview => eachReview.businessId === businessId);
//   return res.status(200).json({
//     message: 'Reviews found',
//     reviews
//   });
// }
