/* eslint no-undef: "off" */
import reducer from './../../src/reducers/businessReducer';
import * as types from './../../src/types/Types';
import * as businessData from './../mockData/businessData';

const {
  businessObject,
  allBusinesses,
  businessRating,
  businessReponseFail,
  businessUpdate
} = businessData;

const defaultState = {
  businesses: [],
  business: {},
  paginate: {},
  error: null
};
let initialState = defaultState;
let state;

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, undefined)).to.deep.equal(initialState);

    state = initialState;
  });

  it('should handle REGISTER_BUSINESS', () => {
    state = {
      ...initialState,
      business: businessObject.data.business,
      businesses: [...state.businesses, businessObject.data.business]
    };

    expect(reducer(initialState, {
      type: types.REGISTER_BUSINESS,
      credentials: businessObject.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle REGISTER_BUSINESS_FAILED', () => {
    state = { ...defaultState, error: businessReponseFail.error };

    expect(reducer(initialState, {
      type: types.REGISTER_BUSINESS_FAILED,
      error: businessReponseFail.error
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_ALL_BUSINESSES', () => {
    state = {
      ...initialState,
      businesses: allBusinesses.data.businesses,
      paginate: allBusinesses.data.paginate
    };

    expect(reducer(initialState, {
      type: types.GET_ALL_BUSINESSES,
      credentials: allBusinesses.data
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle EDIT_BUSINESS', () => {
    state = {
      ...initialState,
      business: {},
      businesses: allBusinesses.data.businesses
    };

    expect(reducer(initialState, {
      type: types.EDIT_REVIEW,
      credentials: businessUpdate.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle CHANGE_OWNERSHIP', () => {
    state = {
      ...initialState,
      business: {},
      businesses: allBusinesses.data.businesses
    };

    expect(reducer(initialState, {
      type: types.EDIT_REVIEW,
      credentials: businessUpdate.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_BUSINESS_DETAILS', () => {
    state = {
      ...initialState,
      business: businessObject.data.business,
      error: null
    };

    expect(reducer(initialState, {
      type: types.GET_BUSINESS_DETAILS,
      credentials: businessObject.data.business
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_USER_BUSINESSES', () => {
    state = {
      ...initialState,
      businesses: allBusinesses.data.businesses,
      paginate: allBusinesses.data.paginate
    };

    expect(reducer(initialState, {
      type: types.GET_USER_BUSINESSES,
      credentials: allBusinesses.data
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle BUSINESS_RATING', () => {
    state = {
      ...initialState,
      business: {
        ...initialState.business,
        ...businessRating.data
      }
    };

    expect(reducer(initialState, {
      type: types.BUSINESS_RATING,
      credentials: businessRating.data.rating
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
      credentials: businessId
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle DELETE_BUSINESS_FAILED', () => {
    state = { ...defaultState, error: businessReponseFail.error };

    expect(reducer(initialState, {
      type: types.DELETE_BUSINESS_FAILED,
      error: businessReponseFail.error
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle GET_BUSINESS_FAILED', () => {
    state = { ...defaultState, error: businessReponseFail.error };


    expect(reducer(initialState, {
      type: types.GET_BUSINESS_FAILED,
      error: businessReponseFail.error
    })).to.deep.include(state);

    initialState = state;
  });

  it('should handle GET_USER_BUSINESSES_FAILED', () => {
    state = { ...defaultState, error: businessReponseFail.error };


    expect(reducer(initialState, {
      type: types.GET_USER_BUSINESSES_FAILED,
      error: businessReponseFail.error
    })).to.deep.include(state);

    initialState = state;
  });
});
