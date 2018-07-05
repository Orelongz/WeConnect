/* eslint no-undef: "off" */
import reducer from './../../src/reducers/reviewReducer';
import * as types from './../../src/types/Types';
import * as reviewData from './../mockData/reviewData';

const {
  reviewResponse,
  businessReviews,
  reviewResponseFail
} = reviewData;
let initialState = {
  reviews: [],
  error: null
};
let state;

describe('review reducer', () => {
  it('should return the initial state', () => {
    state = initialState;

    expect(reducer(initialState, {})).to.deep.equal(state);

    initialState = state;
  });

  it('should handle ADD_REVIEW', () => {
    state = {
      ...initialState,
      error: null,
      reviews: [...state.reviews, reviewResponse.data.review]
    };

    expect(reducer(initialState, {
      type: types.ADD_REVIEW,
      credentials: reviewResponse.data.review
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle ADD_REVIEW_FAILED', () => {
    state = {
      ...initialState,
      error: reviewResponseFail.error
    };

    expect(reducer(initialState, {
      type: types.ADD_REVIEW_FAILED,
      error: reviewResponseFail.error
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_BUSINESS_REVIEWS', () => {
    state = {
      ...initialState,
      reviews: businessReviews.data.reviews
    };

    expect(reducer(initialState, {
      type: types.GET_BUSINESS_REVIEWS,
      credentials: businessReviews.data.reviews
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle EDIT_REVIEW', () => {
    state = {
      ...initialState,
      error: null,
      reviews: [reviewResponse.data.review]
    };

    expect(reducer(initialState, {
      type: types.EDIT_REVIEW,
      credentials: reviewResponse.data.review
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle EDIT_REVIEW_FAILED', () => {
    state = {
      ...initialState,
      error: reviewResponseFail.error
    };

    expect(reducer(initialState, {
      type: types.EDIT_REVIEW_FAILED,
      error: reviewResponseFail.error
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle DELETE_REVIEW', () => {
    const { review: theReview } = reviewResponse.data;
    state = {
      ...initialState,
      error: null,
      reviews: state.reviews.filter(review => review.id !== theReview.reviewId)
    };

    expect(reducer(initialState, {
      type: types.DELETE_REVIEW,
      credentials: reviewResponse.data.review
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle DELETE_REVIEW_FAILED', () => {
    state = {
      ...initialState,
      error: reviewResponseFail.error
    };

    expect(reducer(initialState, {
      type: types.DELETE_REVIEW_FAILED,
      error: reviewResponseFail.error
    })).to.deep.equal(state);

    initialState = state;
  });
});
