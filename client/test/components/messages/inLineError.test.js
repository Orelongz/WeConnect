/* eslint no-undef: "off" */
import React from 'react';
import InlineError from './../../../src/components/messages/InlineError.jsx';

let props;
const setup = () => {
  props = {
    text: jest.fn().getMockName()
  };
  return shallow(<InlineError { ...props } />);
};

describe('InlineError component', () => {
  it('should render the InlineError component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).to.eql(1);
  });
});
