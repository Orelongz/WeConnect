import { expect } from 'chai';
import reducer from './../../src/reducers/reviewReducer';
import * as types from './../../src/types/Types';
import * as reviewData from './../mockData/reviewData';

const { reviewResponse, businessReviews } = reviewData;
let initialState = {
  review: {},
  reviews: []
};
let state;

describe('user reducer', () => {
  it('should return the initial state', () => {
    state = initialState;

    expect(reducer(initialState, {})).to.deep.equal(state);

    initialState = state;
  });

  it('should handle ADD_REVIEW', () => {
    state = {
      ...initialState,
      review: reviewResponse.data.review,
      reviews: [...state.reviews, reviewResponse.data.review]
    };

    expect(reducer(initialState, {
      type: types.ADD_REVIEW,
      review: reviewResponse.data.review
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
      reviews: businessReviews.data.reviews
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle EDIT_REVIEW', () => {
    state = {
      ...initialState,
      review: reviewResponse.data.review
    };

    expect(reducer(initialState, {
      type: types.EDIT_REVIEW,
      review: reviewResponse.data.review
    })).to.deep.equal(state);

    initialState = state;
  });
});
