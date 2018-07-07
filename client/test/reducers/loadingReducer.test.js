import { expect } from 'chai';
import reducer from './../../src/reducers/loadingReducer';
import * as types from './../../src/types/Types';

let initialState = {
  isPageLoading: false,
  isRequestLoading: false
};
let state;
describe('user reducer', () => {
  it('should return the initial state', () => {
    state = initialState;

    expect(reducer(initialState, {})).to.deep.equal(state);

    initialState = state;
  });

  it('should handle IS_PAGE_LOADING when it is false', () => {
    state = { ...state, isPageLoading: false };

    expect(reducer(initialState, {
      type: types.IS_PAGE_LOADING,
      status: false
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle IS_PAGE_LOADING when it is true', () => {
    state = { ...state, isPageLoading: true };

    expect(reducer(initialState, {
      type: types.IS_PAGE_LOADING,
      status: true
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle IS_REQUEST_LOADING when it is false', () => {
    state = { ...state, isRequestLoading: false };

    expect(reducer(initialState, {
      type: types.IS_REQUEST_LOADING,
      status: false
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle IS_REQUEST_LOADING when it is true', () => {
    state = { ...state, isRequestLoading: true };

    expect(reducer(initialState, {
      type: types.IS_REQUEST_LOADING,
      status: true
    })).to.deep.equal(state);

    initialState = state;
  });
});
