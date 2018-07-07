/* eslint no-undef: "off" */
import * as actions from './../../src/actions/businessAction';
import * as types from './../../src/types/Types';
import {
  businessObject,
  credentials,
  businessReponseFail,
  allBusinesses,
  businessUpdate,
  updateCredentials,
  businessRating
} from './../mockData/businessData';

let theBusinessId;

describe('Business actions tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('register business action', () => {
    it('should register a new business', (done) => {
      moxios.stubRequest('/api/v1/businesses', {
        status: 201,
        response: businessObject
      });

      const { business } = businessObject.data;
      theBusinessId = business.businessId;
      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.REGISTER_BUSINESS,
          credentials: business
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.newBusiness(credentials, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not register a new business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: businessReponseFail
        });
      });

      const { business } = businessObject.data;
      theBusinessId = business.businessId;
      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.REGISTER_BUSINESS_FAILED,
          error: businessReponseFail.error
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.newBusiness(credentials, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('get all the businesses', () => {
    it('should retrieve all the businesses', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 200,
          response: allBusinesses
        });
      });

      const { data: businessesResponse } = allBusinesses;
      const expectedActions = [
        {
          type: types.IS_PAGE_LOADING,
          status: true
        },
        {
          type: types.GET_ALL_BUSINESSES,
          credentials: businessesResponse
        },
        {
          type: types.IS_PAGE_LOADING,
          status: false
        },
      ];
      const store = mockStore({ businesses: [] });

      return store.dispatch(actions.allBusinesses())
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('get user businesses action', () => {
    it('should retrieve all businesses belonging to a user', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 200,
          response: allBusinesses
        });
      });

      const { data: businessesResponse } = allBusinesses;
      const expectedActions = [
        {
          type: types.IS_PAGE_LOADING,
          status: true
        },
        {
          type: types.GET_USER_BUSINESSES,
          credentials: businessesResponse
        },
        {
          type: types.IS_PAGE_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.userBusinesses())
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not retrieve businesses', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: businessReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_PAGE_LOADING,
          status: true
        },
        {
          type: types.GET_USER_BUSINESSES_FAILED,
          error: businessReponseFail.error
        },
        {
          type: types.IS_PAGE_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.userBusinesses(props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('get a business action', () => {
    it('should retrieve the details of an existing business', (done) => {
      moxios.stubRequest(`/api/v1/businesses/${theBusinessId}`, {
        status: 200,
        response: businessObject
      });

      const { business } = businessObject.data;
      const expectedActions = [
        {
          type: types.IS_PAGE_LOADING,
          status: true
        },
        {
          type: types.GET_BUSINESS_DETAILS,
          credentials: business
        },
        {
          type: types.IS_PAGE_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.getBusiness(theBusinessId, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not retrieve the details of the business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: businessReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_PAGE_LOADING,
          status: true
        },
        {
          type: types.GET_BUSINESS_FAILED,
          error: businessReponseFail.error
        },
        {
          type: types.IS_PAGE_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.getBusiness(theBusinessId, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('edit business action', () => {
    it('should update the details of an existing business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: businessUpdate
        });
      });

      const { business } = businessUpdate.data;
      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.EDIT_BUSINESS,
          credentials: business
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.editBusiness(updateCredentials, theBusinessId, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not update the details of the business business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: businessReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.EDIT_BUSINESS_FAILED,
          error: businessReponseFail.error
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.editBusiness(updateCredentials, theBusinessId))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('change business ownership action', () => {
    it('should change the ownership of an existing business', (done) => {
      const { business } = businessObject.data;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            status: 'success',
            data: {
              message: 'Business transferred',
              business
            }
          }
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.CHANGE_OWNERSHIP,
          credentials: business
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.changeOwnership(credentials, theBusinessId, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not change the ownership of an existing business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: businessReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.CHANGE_OWNERSHIP_FAILED,
          error: businessReponseFail.error
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.changeOwnership(credentials, theBusinessId, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('delete business action', () => {
    it('should delete an existing business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 200,
          response: {
            status: 'success',
            message: 'Business deleted'
          }
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.DELETE_BUSINESS,
          credentials: theBusinessId
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.deleteBusiness(theBusinessId, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not delete the business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: businessReponseFail
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.DELETE_BUSINESS_FAILED,
          error: businessReponseFail.error
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.deleteBusiness(theBusinessId, props))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('business rating action', () => {
    it('should retrieve the rating for a business', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 200,
          response: businessRating
        });
      });

      const { rating } = businessRating.data;
      const expectedActions = [{
        type: types.BUSINESS_RATING,
        credentials: rating
      }];
      const store = mockStore({});

      return store.dispatch(actions.businessRating(theBusinessId))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });
});
