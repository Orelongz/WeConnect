/* eslint no-undef: "off" */
import React from 'react';
import EditReviewForm from './../../../src/components/forms/EditReviewForm.jsx';

let props;
const setup = () => {
  props = {
    reviewFormError: jest.fn().getMockName(),
    displayImage: jest.fn().getMockName(),
    changeRating: jest.fn(),
    isLoading: true || false,
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    update: {},
    User: {},
    toggleEditing: jest.fn()
  };
  return shallow(<EditReviewForm {...props} />);
};

describe('EditReviewForm component', () => {
  it('should render the EditReviewForm component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('img').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(2);
    expect(wrapper.find('h5').length).to.eql(1);
    expect(wrapper.find('StarRatings').length).to.eql(1);
    expect(wrapper.find('span').length).to.eql(1);
    expect(wrapper.find('textarea').length).to.eql(1);
    expect(wrapper.find('button').length).to.eql(1);
  });
});
