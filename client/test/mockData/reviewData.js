export const reviewObject = {
  review: 'a review by user',
  rating: 4,
};

export const reviewResponse = {
  status: 'success',
  data: {
    review: {
      id: '4dd7ec66-ce1b-4b3a-beae-03e53f32b4bf',
      review: 'girls like you',
      rating: 4,
      createdAt: '2018-07-27T15:09:38.831Z',
      updatedAt: '2018-07-27T15:09:38.831Z',
      businessId: '4af144cc-6964-423f-b5c0-1793ae2a4361',
      userId: 'ae65c7e3-390a-4abd-9e73-7fbdbf6d37e1',
      User: {
        firstname: 'longman',
        lastname: 'pelumi',
        userImage: ''
      }
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
        id: '4dd7ec66-ce1b-4b3a-beae-03e53f32b4bf',
        review: 'girls like you',
        rating: 4,
        createdAt: '2018-07-27T15:09:38.831Z',
        updatedAt: '2018-07-27T15:09:38.831Z',
        businessId: '4af144cc-6964-423f-b5c0-1793ae2a4361',
        userId: 'ae65c7e3-390a-4abd-9e73-7fbdbf6d37e1',
        User: {
          firstname: 'longman',
          lastname: 'pelumi',
          userImage: ''
        }
      }
    ]
  }
};
