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
      reviewId: ''
    }
  }
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
        reviewId: ''
      }
    ]
  }
};
