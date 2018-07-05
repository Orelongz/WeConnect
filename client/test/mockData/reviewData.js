export const reviewObject = {
  review: 'a review by user',
  rating: 4,
};

export const reviewResponse = {
  status: 'success',
  data: {
    review: {
      review: 'a review by user',
      rating: 4,
      businessId: '',
      userId: '',
      reviewId: 3
    }
  }
};

export const reviewResponseFail = {
  status: 'fail',
  error: 'Some message about failure'
};

export const businessReviews = {
  status: 'success',
  data: {
    reviews: [
      {
        review: 'a review by user',
        rating: 4,
        businessId: '',
        userId: '',
        reviewId: 3
      }
    ]
  }
};
