/* eslint no-undef: "off" */
import React from 'react';
import ContactForm from './../../../src/components/forms/ContactForm.jsx';

let props;
const setup = () => {
  props = {
    errors: {},
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    data: {},
    isLoading: true || false
  };
  return shallow(<ContactForm {...props} />);
};

describe('ContactForm component', () => {
  it('should render the ContactForm component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(2);
    expect(wrapper.find('input').length).to.eql(2);
    expect(wrapper.find('textarea').length).to.eql(1);
    expect(wrapper.find('button').length).to.eql(1);
  });
});
