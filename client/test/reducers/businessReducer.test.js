import { expect } from 'chai';
import reducer from './../../src/reducers/businessReducer';
import * as types from './../../src/types/Types';
import * as businessData from './../mockData/businessData';

const {
  businessObject, allBusinesses, businessUpdate, businessRating
} = businessData;
let initialState = {
  businesses: [],
  business: {},
  paginate: {}
};
let state;

describe('user reducer', () => {
  it('should return the initial state', () => {
    state = initialState;

    expect(reducer(initialState, {})).to.deep.equal(state);

    initialState = state;
  });

  it('should handle REGISTER_BUSINESS', () => {
    state = {
      ...initialState,
      business: businessObject.data.business,
      businesses: [...state.businesses, businessObject.data.business]
    };

    expect(reducer(initialState, {
      type: types.REGISTER_BUSINESS,
      business: businessObject.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_ALL_BUSINESSES', () => {
    state = {
      ...initialState,
      businesses: allBusinesses.data.businesses
    };

    expect(reducer(initialState, {
      type: types.GET_ALL_BUSINESSES,
      businesses: allBusinesses.data.businesses
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle EDIT_BUSINESS', () => {
    state = {
      ...initialState,
      business: businessObject.data.business
    };

    expect(reducer(initialState, {
      type: types.EDIT_REVIEW,
      business: businessUpdate.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle CHANGE_OWNERSHIP', () => {
    state = {
      ...initialState,
      business: businessObject.data.business
    };

    expect(reducer(initialState, {
      type: types.EDIT_REVIEW,
      business: businessObject.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_BUSINESS_DETAILS', () => {
    state = {
      ...initialState,
      business: businessObject.data.business
    };

    expect(reducer(initialState, {
      type: types.GET_BUSINESS_DETAILS,
      business: businessObject.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_USER_BUSINESSES', () => {
    state = {
      ...initialState,
      businesses: allBusinesses.data.businesses
    };

    expect(reducer(initialState, {
      type: types.GET_USER_BUSINESSES,
      businesses: allBusinesses.data.businesses
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle BUSINESS_RATING', () => {
    state = {
      ...initialState,
      business: {
        ...initialState.business,
        ...businessRating.data.rating
      }
    };

    expect(reducer(initialState, {
      type: types.BUSINESS_RATING,
      rating: businessRating.data.rating
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle PAGINATE_BUSINESSES', () => {
    state = {
      ...initialState,
      paginate: allBusinesses.paginate
    };

    expect(reducer(initialState, {
      type: types.PAGINATE_BUSINESSES,
      paginate: allBusinesses.paginate
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle DELETE_BUSINESS', () => {
    const { businessId } = businessObject.data.business;
    state = {
      ...initialState,
      business: {},
      businesses: initialState.businesses.filter(business => business.id !== businessId)
    };

    expect(reducer(initialState, {
      type: types.DELETE_BUSINESS,
      businessId
    })).to.deep.equal(state);

    initialState = state;
  });
});
