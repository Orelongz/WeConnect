import Review from './../models/reviewModel';
import { allBusinesses } from './businessController';

/**
 * addReview()
 * @desc adds a review to a business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business(containing the review)
 */
const addReview = (req, res) => {
  let theBusiness;
  const { businessId } = req.params;
  const { review } = req.body;
  allBusinesses.forEach((business) => {
    if (business.businessId === Number(businessId)) {
      const theReview = new Review(review);
      business.reviews.push(theReview);
      theBusiness = business;
    }
  });
  if (!theBusiness) {
    return res.status(404).json({
      message: 'Business was not found'
    });
  }
  return res.status(201).json({
    message: 'Review was successfully added',
    business: theBusiness
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
  const { reviews } = theBusiness;
  return res.status(200).json({
    message: 'Reviews found',
    reviews
  });
};

export { addReview, getBusinessReview };
