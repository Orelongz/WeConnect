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

  describe('verify user account', () => {
    it('should verify a users account', (done) => {
      moxios.stubRequest('/api/v1/auth/verify', {
        status: 200,
        response: {
          status: 'success',
          user: signUpResponse.data.user
        }
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.VERIFY_ACCOUNT,
          credentials: signUpResponse.data.user
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.verifyAccount(signinResponse))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not verify a users account', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: {
            status: 'fail',
            error: 'Verification not successful'
          }
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.VERIFY_ACCOUNT_FAILED,
          error: 'Verification not successful'
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.verifyAccount(signinResponse))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('contact us action', () => {
    it('should send the message inputted by user', (done) => {
      moxios.stubRequest('/api/v1/contactUs', {
        status: 200,
        response: {
          status: 'success',
          message: 'Message delivered'
        }
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.contactUs({ email: 'mail@domain.com' }))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });
});
