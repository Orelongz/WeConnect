/* eslint no-undef: "off" */
import React from 'react';
import VerifyEmailMessage from './../../../src/components/messages/VerifyEmailMessage.jsx';

let props;
const setup = () => {
  props = {
    name: jest.fn().getMockName()
  };
  return shallow(<VerifyEmailMessage { ...props } />);
};

describe('VerifyEmailMessage component', () => {
  it('should render the VerifyEmailMessage component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(1);
  });
});
