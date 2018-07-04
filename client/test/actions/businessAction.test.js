/* eslint no-undef: "off" */
import * as actions from './../../src/actions/businessAction';
import * as types from './../../src/types/Types';
import * as businessData from './../mockData/businessData';

let theBusinessId;

describe('Business actions tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('register business action', () => {
    it('should register a new business', (done) => {
      moxios.stubRequest('/api/v1/businesses', {
        status: 201,
        response: businessData.businessObject
      });

      const { business } = businessData.businessObject.data;
      theBusinessId = business.businessId;
      const expectedActions = [{
        type: types.REGISTER_BUSINESS,
        business
      }];
      const store = mockStore({});

      return store.dispatch(actions.newBusiness(businessData.credentials))
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
          response: businessData.allBusinesses
        });
      });

      const { businesses, paginate } = businessData.allBusinesses.data;
      const expectedActions = [
        {
          type: types.GET_ALL_BUSINESSES,
          businesses
        },
        {
          type: types.PAGINATE_BUSINESSES,
          paginate
        }
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
          response: businessData.allBusinesses
        });
      });

      const { businesses } = businessData.allBusinesses.data;
      const expectedActions = [{
        type: types.GET_USER_BUSINESSES,
        businesses
      }];
      const store = mockStore({});

      return store.dispatch(actions.userBusinesses())
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
        response: businessData.businessObject
      });

      const { business } = businessData.businessObject.data;
      const expectedActions = [{
        type: types.GET_BUSINESS_DETAILS,
        business
      }];
      const store = mockStore({});

      return store.dispatch(actions.getBusiness(theBusinessId))
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
          response: businessData.businessUpdate
        });
      });

      const { business } = businessData.businessUpdate.data;
      const expectedActions = [{
        type: types.EDIT_BUSINESS,
        business
      }];
      const store = mockStore({});

      return store.dispatch(actions.editBusiness(businessData.updateCredentials, theBusinessId))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('change business ownership action', () => {
    it('should change the ownership of an existing business', (done) => {
      const { business } = businessData.businessObject.data;
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

      const expectedActions = [{
        type: types.CHANGE_OWNERSHIP,
        business
      }];
      const store = mockStore({});

      return store.dispatch(actions.changeOwnership(businessData.credentials, theBusinessId))
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

      const expectedActions = [{
        type: types.DELETE_BUSINESS,
        businessId: theBusinessId
      }];
      const store = mockStore({});

      return store.dispatch(actions.deleteBusiness(theBusinessId))
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
          response: businessData.businessRating
        });
      });

      const { rating } = businessData.businessRating.data;
      const expectedActions = [{
        type: types.BUSINESS_RATING,
        rating
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
