/* eslint no-undef: "off" */
import reducer from './../../src/reducers/userReducer';
import * as types from './../../src/types/Types';
import * as userData from './../mockData/userData';

const { user } = userData.signUpResponse.data;
const { error } = userData.userReponseFail.error;
let initialState = {};
let state;
describe('user reducer', () => {
  it('should return the initial state', () => {
    state = initialState;

    expect(reducer(initialState, {})).to.deep.equal(state);

    initialState = state;
  });

  it('should handle USER_SIGNED_IN', () => {
    state = { ...user };

    expect(reducer(initialState, {
      type: types.USER_SIGNED_IN,
      credentials: user
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle SIGN_IN_FAILED', () => {
    state = { error };

    expect(reducer(initialState, {
      type: types.SIGN_IN_FAILED,
      error
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle USER_LOGGED_OUT', () => {
    state = {};

    expect(reducer(initialState, {
      type: types.USER_LOGGED_OUT,
      credentials: {}
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle FETCH_USER_DETAILS', () => {
    state = { ...state, ...user };

    expect(reducer(initialState, {
      type: types.FETCH_USER_DETAILS,
      credentials: user
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle EDITTED_USER_DETAIL', () => {
    state = { ...state, ...user };

    expect(reducer(initialState, {
      type: types.EDITTED_USER_DETAIL,
      credentials: user
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle EDIT_USER_DETAIL_FAILED', () => {
    state = { error };

    expect(reducer(initialState, {
      type: types.EDIT_USER_DETAIL_FAILED,
      error
    })).to.deep.equal(state);

    initialState = state;
  });
});
