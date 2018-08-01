/* eslint no-undef: "off" */
import React from 'react';
import { signinResponse } from './../../../mockData/userData';
import { businessReviews } from './../../../mockData/reviewData';
import ReviewList from './../../../../src/components/pages/BusinessProfile/ReviewsList.jsx';

let props;
const setup = () => {
  props = {
    handleDeleteReview: jest.fn(),
    toggleEditing: jest.fn(),
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    changeRating: jest.fn(),
    User: signinResponse.data.user,
    update: {},
    businessReviews: businessReviews.data.reviews,
    reviewFormError: jest.fn().getMockName(),
    displayUserImage: jest.fn().getMockName(),
    editing: jest.fn().getMockName(),
    isLoading: false
  };
  return shallow(<ReviewList { ...props } />);
};

const setupOnEditing = () => {
  props = {
    ...props,
    editing: '4dd7ec66-ce1b-4b3a-beae-03e53f32b4bf'
  };
  return shallow(<ReviewList { ...props } />);
};

describe('ReviewList component', () => {
  it('should render the Reviews list successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(3);
    expect(wrapper.find('ul').length).to.eql(1);
    expect(wrapper.find('li').length).to.eql(1);
    expect(wrapper.find('img').length).to.eql(1);
    expect(wrapper.find('StarRatings').length).to.eql(1);
  });

  it('should render the reviews list and editing review successfully', () => {
    const wrapper = setupOnEditing();
    expect(wrapper.find('ul').length).to.eql(1);
    expect(wrapper.find('EditReviewForm').length).to.eql(1);
  });
});
