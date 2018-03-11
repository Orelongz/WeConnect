import Review from './../models/reviewModel';
import { allBusinesses } from './businessController';

const allReviews = [];
/**
 * addReview()
 * @desc adds a review to a business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business(containing the review)
 */
const addReview = (req, res) => {
  let theReview;
  const { businessId } = req.params;
  const { review } = req.body;

  allBusinesses.forEach((business) => {
    if (business.businessId === Number(businessId)) {
      theReview = new Review(review, businessId);
      allReviews.push(theReview);
      business.reviews.push(theReview.reviewId);
    }
  });
  if (!theReview) {
    return res.status(404).json({
      message: 'Business was not found'
    });
  }
  return res.status(201).json({
    message: 'Review was successfully added',
    review: theReview
  });
};

/**
 * getBusinessReview()
 * @desc adds a review to a business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, reviews
 */
const getBusinessReview = (req, res) => {
  const { businessId } = req.params;
  const theBusiness = allBusinesses.find(business => business.businessId === Number(businessId));

  if (!theBusiness) {
    return res.status(404).json({
      message: 'Business was not found'
    });
  }

  const reviews = allReviews.filter(eachReview => eachReview.businessId === businessId);
  return res.status(200).json({
    message: 'Reviews found',
    reviews
  });
};

export { addReview, getBusinessReview };
