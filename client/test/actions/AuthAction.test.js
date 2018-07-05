/* eslint no-undef: "off" */
import * as actions from './../../src/actions/AuthAction';
import * as types from './../../src/types/Types';
import {
  signUpResponse,
  signUpUser,
  userUpdate,
  userReponseFail,
  signinResponse,
  signinUser,
  userDetails
} from './../mockData/userData';

describe('Auth actions tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('signup action', () => {
    it('should register a new user', (done) => {
      moxios.stubRequest('/api/v1/auth/signup', {
        status: 201,
        response: signUpResponse
      });

      const { user } = signUpResponse.data;
      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.USER_SIGNED_IN,
          credentials: user
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.signup(signUpUser, props))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not register a new user', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: userReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.SIGN_IN_FAILED,
          error: userReponseFail.error[0]
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.signup(signUpUser, props))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('signin action', () => {
    it('should sigin an existing user', (done) => {
      moxios.stubRequest('/api/v1/auth/login', {
        status: 200,
        response: signinResponse
      });

      const { user } = signinResponse.data;
      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.USER_SIGNED_IN,
          credentials: user
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.signin(signinUser, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not sign user', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: userReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.SIGN_IN_FAILED,
          error: userReponseFail.error[0]
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.signin(signinUser, props))
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
        type: types.USER_LOGGED_OUT,
        credentials: {}
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
        response: userDetails
      });

      const { user } = userDetails.data;
      const expectedActions = [{
        type: types.FETCH_USER_DETAILS,
        credentials: user
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
        response: signinResponse
      });

      const { user } = signinResponse.data;
      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.EDIT_USER_DETAIL,
          credentials: user
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.editUser(userUpdate))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not update the details of a user', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: userReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.EDIT_USER_DETAIL_FAILED,
          error: userReponseFail.error[0]
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.editUser(userUpdate))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });
});
