import Review from './../models/reviewModel';
import { allBusinesses } from './businessController';

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

export default addReview;
