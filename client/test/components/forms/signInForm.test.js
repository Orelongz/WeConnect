/* eslint no-undef: "off" */
import React from 'react';
import SignInForm from './../../../src/components/forms/SignInForm.jsx';

let props;
const setup = () => {
  props = {
    isLoading: true || false,
    data: {},
    errors: {},
    onChange: jest.fn(),
    onSubmit: jest.fn()
  };
  return shallow(<SignInForm {...props} />);
};

describe('SignInForm component', () => {
  it('should render the SignInForm component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(2);
    expect(wrapper.find('input').length).to.eql(2);
    expect(wrapper.find('label').length).to.eql(2);
    expect(wrapper.find('button').length).to.eql(1);
    expect(wrapper.find('i').length).to.eql(1);
  });
});
