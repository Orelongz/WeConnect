/* eslint no-undef: "off" */
import React from 'react';
import InfoMessage from './../../../src/components/messages/InfoMessage.jsx';

let props;
const setup = () => {
  props = {
    text: jest.fn().getMockName(),
    type: jest.fn().getMockName()
  };
  return shallow(<InfoMessage { ...props } />);
};

describe('InfoMessage component', () => {
  it('should render the InfoMessage component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(1);
  });
});
