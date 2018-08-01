/* eslint no-undef: "off" */
import React from 'react';
import ReviewForm from './../../../src/components/forms/ReviewForm.jsx';

let props;
const setup = () => {
  props = {
    displayUserImage: jest.fn().getMockName(),
    reviewFormError: jest.fn().getMockName(),
    toggleEditStatus: jest.fn(),
    changeRating: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    data: {},
    isLoading: true || false,
    editing: jest.fn().getMockName()
  };
  return shallow(<ReviewForm {...props} />);
};

describe('ReviewForm component', () => {
  it('should render the ReviewForm component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(3);
    expect(wrapper.find('img').length).to.eql(1);
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('label').length).to.eql(1);
    expect(wrapper.find('textarea').length).to.eql(1);
    expect(wrapper.find('StarRatings').length).to.eql(1);
    expect(wrapper.find('button').length).to.eql(1);
  });
});
