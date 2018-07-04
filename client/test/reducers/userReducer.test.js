import { expect } from 'chai';
import reducer from './../../src/reducers/userReducer';
import * as types from './../../src/types/Types';
import * as userData from './../mockData/userData';

const { user } = userData.signUpResponse.data;

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer({}, {})).to.deep.equal({});
  });

  it('should handle USER_SIGNED_IN', () => {
    expect(reducer({}, {
      type: types.USER_SIGNED_IN,
      user
    })).to.deep.equal({ ...user });
  });

  it('should handle USER_LOGGED_OUT', () => {
    expect(reducer({}, {
      type: types.USER_LOGGED_OUT
    })).to.deep.equal({});
  });

  it('should handle FETCH_USER_DETAILS', () => {
    expect(reducer({}, {
      type: types.FETCH_USER_DETAILS,
      user
    })).to.deep.equal({ ...user });
  });

  it('should handle EDITTED_USER_DETAIL', () => {
    expect(reducer({}, {
      type: types.EDITTED_USER_DETAIL,
      user
    })).to.deep.equal({ ...user });
  });
});
