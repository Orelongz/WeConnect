/* eslint no-undef: "off" */
import React from 'react';
import SignupForm from './../../../src/components/forms/SignUpForm.jsx';

const setup = () => {
  props = {
    isLoading: false,
    data: {},
    errors: {
      firstname: 'required',
      lastname: 'required',
      email: 'required',
      password: 'required',
      confirmPassword: 'required'
    },
    onChange: jest.fn(),
    onSubmit: jest.fn()
  };
  return shallow(<SignupForm {...props} />);
};

describe('SignupForm component', () => {
  it('should render the SignupForm component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(9);
    expect(wrapper.find('input').length).to.eql(5);
    expect(wrapper.find('label').length).to.eql(3);
    expect(wrapper.find('button').length).to.eql(1);
    expect(wrapper.find('i').length).to.eql(1);
  });
});
