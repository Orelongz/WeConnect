/* eslint no-undef: "off" */
import * as actions from './../../src/actions/reviewAction';
import * as types from './../../src/types/Types';
import * as reviewData from './../mockData/reviewData';
import * as userData from './../mockData/userData';

const businessId = 'bd3c6cd6-09d5-4aeb-bc03-7a9ee3f88dcb';
const reviewId = '0755e515-7695-4873-8ca4-c57dbe7c973c';
const { user } = userData.userDetails.data;

describe('Review actions tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('add review action', () => {
    it('should add review to an existing business', (done) => {
      const { reviewObject, reviewResponse } = reviewData;
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
        status: 201,
        response: reviewResponse
      });

      const expectedActions = [{
        type: types.ADD_REVIEW,
        review: { ...reviewResponse.data.review, User: user }
      }];
      const store = mockStore({});

      return store.dispatch(actions.addReview(reviewObject, businessId, user))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('retrieve business reviews action', () => {
    it('should retrieve all reviews for a business', (done) => {
      const { businessReviews } = reviewData;
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
        status: 200,
        response: businessReviews
      });

      const expectedActions = [{
        type: types.GET_BUSINESS_REVIEWS,
        reviews: businessReviews.data.reviews
      }];
      const store = mockStore({});

      return store.dispatch(actions.getBusinessReviews(businessId))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('edit review action', () => {
    it('should update a business review', (done) => {
      const { reviewResponse, reviewObject } = reviewData;
      const { review } = reviewResponse.data;
      const { firstname, lastname, userImage } = user;
      moxios.stubRequest(`/api/v1/reviews/${reviewId}`, {
        status: 201,
        response: reviewResponse
      });

      const expectedActions = [{
        type: types.EDIT_REVIEW,
        review: { ...review, User: { firstname, lastname, userImage } }
      }];
      const store = mockStore({});

      return store
        .dispatch(actions
          .editReview(reviewObject, reviewId, firstname, lastname, userImage))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('delete review action', () => {
    it('should delete a business review', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            status: 'success',
            message: 'Review deleted'
          }
        });
      });

      const expectedActions = [{
        type: types.DELETE_REVIEW,
        reviewId
      }];
      const store = mockStore({});

      return store.dispatch(actions.deleteReview(reviewId))
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });
});
