/* eslint no-undef: "off" */
import * as actions from './../../src/actions/AuthAction';
import * as types from './../../src/types/Types';
import * as userData from './../mockData/userData';

describe('Auth actions tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('signup action', () => {
    it('should register a new user', (done) => {
      moxios.stubRequest('/api/v1/auth/signup', {
        status: 201,
        response: userData.signUpResponse
      });

      const { user } = userData.signUpResponse.data;
      const expectedActions = [{
        type: types.USER_SIGNED_IN,
        user
      }];
      const store = mockStore({});

      return store.dispatch(actions.signup(userData.signUpUser))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('signin action', () => {
    it('should register a new user', (done) => {
      moxios.stubRequest('/api/v1/auth/login', {
        status: 200,
        response: userData.signinResponse
      });

      const { user } = userData.signinResponse.data;
      const expectedActions = [{
        type: types.USER_SIGNED_IN,
        user
      }];
      const store = mockStore({});

      return store.dispatch(actions.signin(userData.signinUser))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('logout action', () => {
    it('should logout a signed in', () => {
      const expectedActions = [{
        type: types.USER_LOGGED_OUT
      }];
      const store = mockStore({});

      store.dispatch(actions.logout());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('fetch user details action', () => {
    it('should retrieve the details of a user', (done) => {
      moxios.stubRequest('/api/v1/user', {
        status: 200,
        response: userData.userDetails
      });

      const { user } = userData.userDetails.data;
      const expectedActions = [{
        type: types.FETCH_USER_DETAILS,
        user
      }];
      const store = mockStore({});

      return store.dispatch(actions.userDetails())
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('edit user details action', () => {
    it('should update the details of a user', (done) => {
      moxios.stubRequest('/api/v1/user', {
        status: 200,
        response: userData.signinResponse
      });

      const { user } = userData.signinResponse.data;
      const expectedActions = [{
        type: types.EDITTED_USER_DETAIL,
        user
      }];
      const store = mockStore({});

      return store.dispatch(actions.editUser(userData.userUpdate))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });
});
