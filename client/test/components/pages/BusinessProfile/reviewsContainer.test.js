/* eslint no-undef: "off" */
import React from 'react';
import ReviewsContainer from './../../../../src/components/pages/BusinessProfile/ReviewsContainer.jsx';

let props;
const setup = () => {
  props = {
    handleDeleteReview: jest.fn(),
    toggleEditing: jest.fn(),
    changeRating: jest.fn(),
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    User: { id: 'user-id' },
    data: {},
    update: {},
    businessReviews: [],
    reviewFormError: '',
    displayUserImage: '',
    editing: jest.fn().getMockName(),
    isLoading: true || false
  };
  return shallow(<ReviewsContainer { ...props } />);
};

describe('ReviewsContainer component', () => {
  it('should render the Reviews container successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(2);
    expect(wrapper.find('ReviewForm').length).to.eql(1);
  });
});
