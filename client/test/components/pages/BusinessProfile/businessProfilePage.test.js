/* eslint no-undef: "off" */
import React from 'react';
import { signinResponse } from './../../../mockData/userData';
import { businessObject } from './../../../mockData/businessData';
import { businessReviews } from './../../../mockData/reviewData';
import connectedBusinessProfilePage, { BusinessProfilePage } from './../../../../src/components/pages/BusinessProfile/BusinessProfilePage.jsx';

let props;
const setup = () => {
  props = {
    getBusiness: jest.fn(() => Promise.resolve()),
    deleteBusiness: jest.fn(() => Promise.resolve()),
    addReview: jest.fn(() => Promise.resolve()),
    getBusinessReviews: jest.fn(() => Promise.resolve()),
    handleDeleteBusiness: jest.fn(() => Promise.resolve()),
    businessRating: jest.fn(() => Promise.resolve()),
    editReview: jest.fn(() => Promise.resolve()),
    deleteReview: jest.fn(() => Promise.resolve()),
    match: {
      params: {
        businessId: jest.fn().getMockName()
      }
    },
    User: signinResponse.data.user,
    businessReviews: businessReviews.data.reviews,
    businessDetails: businessObject.data.business,
    isRequestLoading: false,
    isPageLoading: false,
    displayError: jest.fn().getMockName()
  };
  return shallow(<BusinessProfilePage { ...props } />);
};

describe('BusinessProfilePage component', () => {
  describe('unconnected BusinessProfilePage component', () => {
    it('should render the Register page successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('div').length).to.eql(4);
      expect(wrapper.find('InfoMessage').length).to.eql(1);
    });

    it('should change the value of review in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'review',
          value: 'a new review'
        }
      };
      action.onChange(event);
      expect(action.state.data.review).to.eql('a new review');
    });

    it('should change the value of review when updating in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'review',
          value: 'a new review'
        }
      };
      action.onChange(event);
      expect(action.state.data.review).to.eql('a new review');
    });

    it('should change the state when changeRating method is called', () => {
      const wrapper = setup();
      const action = wrapper.instance();

      action.changeRating(3);
      expect(action.state.data.rating).to.eql(3);

      const toggleEditing = jest.spyOn(wrapper.instance(), 'toggleEditing');
      action.toggleEditing(businessReviews.data.reviews[0]);
      jestExpect(toggleEditing).toBeCalled();
      expect(action.state.editing).to.eql('4dd7ec66-ce1b-4b3a-beae-03e53f32b4bf');

      action.changeRating(3);
      expect(action.state.update.rating).to.eql(3);
    });

    it('should call the toggleEditing method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const toggleEditing = jest.spyOn(wrapper.instance(), 'toggleEditing');

      action.toggleEditing(businessReviews.data.reviews[0]);
      jestExpect(toggleEditing).toBeCalled();
      expect(action.state.editing).to.eql('4dd7ec66-ce1b-4b3a-beae-03e53f32b4bf');

      const event = {
        target: {
          name: 'review',
          value: 'a new review'
        }
      };
      action.onChange(event);
      expect(action.state.update.review).to.eql('a new review');

      action.toggleEditing();
      expect(action.state.editing).to.eql('');
    });

    it('should call the componentDidMount method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const mount = jest.spyOn(wrapper.instance(), 'componentDidMount');
      action.componentDidMount();
      jestExpect(mount).toBeCalled();
    });

    it('should call the onSubmit method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const submit = jest.spyOn(wrapper.instance(), 'onSubmit');
      action.state = {
        data: {
          rating: 0, review: ''
        },
        update: {},
        editing: ''
      };
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();

      action.state = {
        data: {
          rating: 3, review: 'a review'
        },
        update: {},
        editing: ''
      };
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();

      action.state = {
        data: {},
        update: {
          rating: 0, review: ''
        }
      };
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();

      action.state = {
        data: {},
        update: {
          rating: 4, review: 'a review'
        },
        editing: 'businessId'
      };
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();
    });

    it('should call the handleDeleteBusiness method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const handleDeleteBusiness = jest.spyOn(wrapper.instance(), 'handleDeleteBusiness');
      action.handleDeleteBusiness({ preventDefault: () => 1 });
      jestExpect(handleDeleteBusiness).toBeCalled();
    });

    it('should call the handleDeleteReview method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const handleDeleteReview = jest.spyOn(wrapper.instance(), 'handleDeleteReview');
      action.handleDeleteReview({ preventDefault: () => 1 });
      jestExpect(handleDeleteReview).toBeCalled();
    });
  });

  describe('Connected BusinessProfilePage component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        businessReviews: businessReviews.data.reviews,
        isRequestLoading: false,
        isPageLoading: false,
        displayError: jest.fn().getMockName(),
        businessDetails: businessObject.data.businesses,
        User: signinResponse.data.user,
      });
      const wrapper = shallow(<connectedBusinessProfilePage store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
